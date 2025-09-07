import { Test, TestingModule } from '@nestjs/testing';
import { SampleImplementationController } from './sample-implementation.controller';
import { HttpModule } from '@nestjs/axios';
import { SampleImplementationService } from './sample-implementation.service';

describe('SampleImplementationController', () => {
  let controller: SampleImplementationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [SampleImplementationService],
      controllers: [SampleImplementationController],
    }).compile();

    controller = module.get<SampleImplementationController>(SampleImplementationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
