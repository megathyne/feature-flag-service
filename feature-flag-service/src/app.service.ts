import { Injectable } from '@nestjs/common';
import { FeatureToggleService } from './feature-toggle/feature-toggle.service';

@Injectable()
export class AppService {
  constructor(private readonly featureToggleService: FeatureToggleService) {}
  public async getHealth(): Promise<{ status: string, timestamp: string, launchDarkly: boolean }>  {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      launchDarkly: this.featureToggleService.isInitialized()
    };
  }
}
