import { Test, TestingModule } from '@nestjs/testing';
import { SampleImplementationService } from './sample-implementation.service';
import { HttpModule } from '@nestjs/axios';

describe('SampleImplementationService', () => {
  let service: SampleImplementationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [SampleImplementationService],
    }).compile();

    service = module.get<SampleImplementationService>(SampleImplementationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
