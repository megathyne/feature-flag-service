import { FeatureToggleService } from './feature-toggle/feature-toggle.service';
export declare class AppService {
    private readonly featureToggleService;
    constructor(featureToggleService: FeatureToggleService);
    getHealth(): Promise<{
        status: string;
        timestamp: string;
        launchDarkly: boolean;
    }>;
}
