import { FeatureToggleService } from './feature-toggle.service';
import { GetFeatureToggleDto } from './dto/get-feature-toggle.dto';
export declare class FeatureToggleController {
    private readonly featureToggleService;
    constructor(featureToggleService: FeatureToggleService);
    getFeatureToggle(flagKey: string, getFeatureToggleDto: GetFeatureToggleDto): Promise<boolean>;
}
