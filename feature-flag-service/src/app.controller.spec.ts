import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeatureToggleService } from './feature-toggle/feature-toggle.service';

describe('AppController', () => {
  let appController: AppController;
  const timestamp = new Date().toISOString();
  const mockFeatureToggleService = {
    isInitialized: () => true,
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, { provide: FeatureToggleService, useValue: mockFeatureToggleService }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return health', async () => {
      // Arrange

      // Act
      const result = await appController.getHealth();

      // Assert
      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('launchDarkly');
    });
  });
});
