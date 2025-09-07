import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeatureToggleModule } from './feature-toggle/feature-toggle.module';
import { SampleImplementationModule } from './sample-implementation/sample-implementation.module';

@Module({
  imports: [FeatureToggleModule, SampleImplementationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
