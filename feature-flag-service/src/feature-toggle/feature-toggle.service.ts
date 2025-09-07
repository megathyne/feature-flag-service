import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import * as LaunchDarkly from '@launchdarkly/node-server-sdk';
import { Observability } from '@launchdarkly/observability-node'
import { GetFeatureToggleDto } from './dto/get-feature-toggle.dto';

const MISSING_VALUE = "MISSING_VALUE";

@Injectable()
export class FeatureToggleService {
  private readonly logger = new Logger(FeatureToggleService.name);
  private ldClient: LaunchDarkly.LDClient;

  async onModuleInit() {
    this.ldClient = LaunchDarkly.init(process.env.LAUNCHDARKLY_SDK_KEY!,
      {
        plugins: [new Observability({ serviceName: 'my-service-name' })]
      },
    );

    try {
      await this.ldClient.waitForInitialization({timeout: parseInt(process.env.LAUNCHDARKLY_TIMEOUT!)});
      this.logger.log('SDK successfully initialized!');
    } catch (error) {
      this.logger.error('SDK initialization failed:', error);
      throw new InternalServerErrorException(error, 'SDK initialization failed:');
    }
  }

  private contextBuilder(getFeatureToggleDto: GetFeatureToggleDto): LaunchDarkly.LDContext {
    // Set up the context properties. 
    // This context should appear on your LaunchDarkly contexts dashboard
    // if any of the properties are missing, we will use the MISSING_VALUE constant
    if (!getFeatureToggleDto.kind || !getFeatureToggleDto.key || !getFeatureToggleDto.name) {
      this.logger.error('Missing required properties', getFeatureToggleDto);
    }

    return {
      kind: getFeatureToggleDto.kind || MISSING_VALUE,
      key: getFeatureToggleDto.key || MISSING_VALUE,
      name: getFeatureToggleDto.name || MISSING_VALUE,
    };
  }


  public async getFlagValue(flagKey: string, getFeatureToggleDto: GetFeatureToggleDto): Promise<boolean> {
    if (!flagKey) {
      throw new BadRequestException({ flagKey, getFeatureToggleDto }, 'Missing required properties');
    }

    try {
      this.logger.log(`Getting flag value for: flagKey: ${flagKey} context: ${JSON.stringify(getFeatureToggleDto)}`);
      const context = this.contextBuilder(getFeatureToggleDto);
      return this.ldClient.variation(flagKey, context, false);
    } catch (error) {
      this.logger.error('Error getting flag value:', error);
      throw new InternalServerErrorException(error, 'Error getting flag value:');
    }
  }

  public isInitialized(): boolean {
    return this.ldClient.initialized();
  }
}
