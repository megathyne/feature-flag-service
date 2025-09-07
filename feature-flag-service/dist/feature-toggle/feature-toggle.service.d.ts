import { GetFeatureToggleDto } from './dto/get-feature-toggle.dto';
export declare class FeatureToggleService {
    private readonly logger;
    private ldClient;
    onModuleInit(): Promise<void>;
    private contextBuilder;
    getFlagValue(flagKey: string, getFeatureToggleDto: GetFeatureToggleDto): Promise<boolean>;
    isInitialized(): boolean;
}
