import { Module } from '@nestjs/common';
import { SampleImplementationController } from './sample-implementation.controller';
import { SampleImplementationService } from './sample-implementation.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [SampleImplementationController],
  providers: [SampleImplementationService]
})
export class SampleImplementationModule { }
