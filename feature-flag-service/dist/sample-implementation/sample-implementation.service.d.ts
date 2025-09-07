import { HttpService } from '@nestjs/axios';
export declare class SampleImplementationService {
    private readonly httpService;
    private readonly logger;
    constructor(httpService: HttpService);
    private getFeatureFlagValue;
    private previousReleaseCode;
    private newReleaseCode;
    sampleMethod(): Promise<number>;
}
