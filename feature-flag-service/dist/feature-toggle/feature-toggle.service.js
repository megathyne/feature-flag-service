"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FeatureToggleService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureToggleService = void 0;
const common_1 = require("@nestjs/common");
const LaunchDarkly = require("@launchdarkly/node-server-sdk");
const observability_node_1 = require("@launchdarkly/observability-node");
const MISSING_VALUE = "MISSING_VALUE";
let FeatureToggleService = FeatureToggleService_1 = class FeatureToggleService {
    constructor() {
        this.logger = new common_1.Logger(FeatureToggleService_1.name);
    }
    async onModuleInit() {
        this.ldClient = LaunchDarkly.init(process.env.LAUNCHDARKLY_SDK_KEY, {
            plugins: [new observability_node_1.Observability({ serviceName: 'my-service-name' })]
        });
        try {
            await this.ldClient.waitForInitialization({ timeout: parseInt(process.env.LAUNCHDARKLY_TIMEOUT) });
            this.logger.log('SDK successfully initialized!');
        }
        catch (error) {
            this.logger.error('SDK initialization failed:', error);
            throw new common_1.InternalServerErrorException(error, 'SDK initialization failed:');
        }
    }
    contextBuilder(getFeatureToggleDto) {
        if (!getFeatureToggleDto.kind || !getFeatureToggleDto.key || !getFeatureToggleDto.name) {
            this.logger.error('Missing required properties', getFeatureToggleDto);
        }
        return {
            kind: getFeatureToggleDto.kind || MISSING_VALUE,
            key: getFeatureToggleDto.key || MISSING_VALUE,
            name: getFeatureToggleDto.name || MISSING_VALUE,
        };
    }
    async getFlagValue(flagKey, getFeatureToggleDto) {
        if (!flagKey) {
            throw new common_1.BadRequestException({ flagKey, getFeatureToggleDto }, 'Missing required properties');
        }
        try {
            this.logger.log(`Getting flag value for: flagKey: ${flagKey} context: ${JSON.stringify(getFeatureToggleDto)}`);
            const context = this.contextBuilder(getFeatureToggleDto);
            return this.ldClient.variation(flagKey, context, false);
        }
        catch (error) {
            this.logger.error('Error getting flag value:', error);
            throw new common_1.InternalServerErrorException(error, 'Error getting flag value:');
        }
    }
    isInitialized() {
        return this.ldClient.initialized();
    }
};
exports.FeatureToggleService = FeatureToggleService;
exports.FeatureToggleService = FeatureToggleService = FeatureToggleService_1 = __decorate([
    (0, common_1.Injectable)()
], FeatureToggleService);
//# sourceMappingURL=feature-toggle.service.js.map