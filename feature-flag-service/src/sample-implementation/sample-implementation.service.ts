import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { GetFeatureToggleDto } from 'src/feature-toggle/dto/get-feature-toggle.dto';

@Injectable()
export class SampleImplementationService {
  private readonly logger = new Logger(SampleImplementationService.name);
  constructor(private readonly httpService: HttpService) {}

  private async getFeatureFlagValue(flagKey: string, context: GetFeatureToggleDto): Promise<boolean> {
    const { data } = await firstValueFrom(
      this.httpService.get(`http://localhost:3000/feature-toggle/${flagKey}`, { params: context }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw  new InternalServerErrorException('An error happened!', error) ;
        }),
      ),
    );
    return data;
  }

  private async previousReleaseCode(a: number, b: number) {
    return a + b;
  }

  private async newReleaseCode(a: number, b: number) {
    return a * b;
  }

  public async sampleMethod() {
    const a = 1;
    const b = 2;

    try {
      const context: GetFeatureToggleDto = { kind: 'user', key: 'example-user-key', name: 'Sandy' };
      const isEnabled = await this.getFeatureFlagValue('sample-feature', context);

      return isEnabled ? this.newReleaseCode(a, b) : this.previousReleaseCode(a, b);
    } catch (error) {
      this.logger.error('Unhandled exception', error);
      throw new InternalServerErrorException('Unhandled exception', error);
    }
  }
}
