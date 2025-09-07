import { Test, TestingModule } from '@nestjs/testing';
import { FeatureToggleController } from './feature-toggle.controller';
import { FeatureToggleService } from './feature-toggle.service';

describe('FeatureToggleController', () => {
  let controller: FeatureToggleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeatureToggleService],
      controllers: [FeatureToggleController],
    }).compile();

    controller = module.get<FeatureToggleController>(FeatureToggleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
