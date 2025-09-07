import { Controller, Get } from '@nestjs/common';
import { SampleImplementationService } from './sample-implementation.service';

@Controller('sample-implementation')
export class SampleImplementationController {
  constructor(
    private readonly sampleImplementationService: SampleImplementationService,
  ) {}

  @Get()
  sampleMethod(): Promise<number> {
    return this.sampleImplementationService.sampleMethod();
  }
}
