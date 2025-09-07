import { Module } from '@nestjs/common';
import { FeatureToggleService } from './feature-toggle.service';
import { FeatureToggleController } from './feature-toggle.controller';

@Module({
  providers: [FeatureToggleService],
  controllers: [FeatureToggleController]
})
export class FeatureToggleModule {}
