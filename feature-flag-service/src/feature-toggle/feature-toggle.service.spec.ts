import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { FeatureToggleService } from './feature-toggle.service';
import { GetFeatureToggleDto } from './dto/get-feature-toggle.dto';
import * as LaunchDarkly from '@launchdarkly/node-server-sdk';

// Mock LaunchDarkly SDK
jest.mock('@launchdarkly/node-server-sdk');
jest.mock('@launchdarkly/observability-node');

describe('FeatureToggleService', () => {
  let service: FeatureToggleService;
  let mockLdClient: jest.Mocked<LaunchDarkly.LDClient>;

  beforeEach(async () => {
    // Create mock LD client
    mockLdClient = {
      waitForInitialization: jest.fn(),
      variation: jest.fn(),
      initialized: jest.fn(),
    } as any;

    // Mock the LaunchDarkly.init function
    (LaunchDarkly.init as jest.Mock).mockReturnValue(mockLdClient);

    const module: TestingModule = await Test.createTestingModule({
      providers: [FeatureToggleService],
    }).compile();

    service = module.get<FeatureToggleService>(FeatureToggleService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should initialize LaunchDarkly client successfully', async () => {
      // Arrange
      mockLdClient.waitForInitialization.mockResolvedValue(mockLdClient);
      
      // Act
      await service.onModuleInit();

      // Assert
      expect(LaunchDarkly.init).toHaveBeenCalledWith(
        process.env.LAUNCHDARKLY_SDK_KEY,
        expect.objectContaining({
          plugins: expect.any(Array)
        })
      );
      expect(mockLdClient.waitForInitialization).toHaveBeenCalledWith({
        timeout: parseInt(process.env.LAUNCHDARKLY_TIMEOUT!)
      });
    });

    it('should throw InternalServerErrorException when initialization fails', async () => {
      // Arrange
      const error = new Error('SDK initialization failed');

      // Act
      mockLdClient.waitForInitialization.mockRejectedValue(error);
      
      // Assert
      await expect(service.onModuleInit()).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('getFlagValue', () => {
    const mockDto: GetFeatureToggleDto = {
      kind: 'user',
      key: 'test-user-key',
      name: 'Test User'
    };

    beforeEach(async () => {
      // Initialize the service first
      mockLdClient.waitForInitialization.mockResolvedValue(mockLdClient);
      await service.onModuleInit();
    });

    it('should return flag value successfully', async () => {
      // Arrange
      const flagKey = 'test-flag';
      const expectedValue = true;
      mockLdClient.variation.mockResolvedValue(expectedValue);
      
      // Act
      const result = await service.getFlagValue(flagKey, mockDto);

      // Assert
      expect(result).toBe(expectedValue);
      expect(mockLdClient.variation).toHaveBeenCalledWith(
        flagKey,
        expect.objectContaining({
          kind: 'user',
          key: 'test-user-key',
          name: 'Test User'
        }),
        false
      );
    });

    it('should throw BadRequestException when flagKey is empty', async () => {      
      await expect(service.getFlagValue('', mockDto)).rejects.toThrow(BadRequestException);
      await expect(service.getFlagValue('', mockDto)).rejects.toThrow('Bad Request Exception');
    });

    it('should throw BadRequestException when flagKey is null', async () => {
      await expect(service.getFlagValue(null as any, mockDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException when flagKey is undefined', async () => {
      await expect(service.getFlagValue(undefined as any, mockDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException when LaunchDarkly throws error', async () => {
      // Arrange
      const flagKey = 'test-flag';
      const error = new Error('LaunchDarkly error');
      
      // Act
      mockLdClient.variation.mockImplementation(() => {
        throw error;
      });

      // Assert
      await expect(service.getFlagValue(flagKey, mockDto)).rejects.toThrow(InternalServerErrorException);
    });

    it('should handle missing DTO properties gracefully', async () => {
      // Arrange
      const flagKey = 'test-flag';
      const incompleteDto: GetFeatureToggleDto = {
        kind: 'user',
        key: '',
        name: ''
      };
      
      mockLdClient.variation.mockResolvedValue(false);
      
      // Act
      const result = await service.getFlagValue(flagKey, incompleteDto);
      
      // Assert
      expect(result).toBe(false);
      expect(mockLdClient.variation).toHaveBeenCalledWith(
        flagKey,
        expect.objectContaining({
          kind: 'user',
          key: 'MISSING_VALUE',
          name: 'MISSING_VALUE'
        }),
        false
      );
    });
  });

  describe('isInitialized', () => {
    beforeEach(async () => {
      // Initialize the service first
      mockLdClient.waitForInitialization.mockResolvedValue(mockLdClient);
      await service.onModuleInit();
    });

    it('should return true when client is initialized', () => {
      // Arrange
      mockLdClient.initialized.mockReturnValue(true);

      // Act
      const result = service.isInitialized();

      // Assert
      expect(result).toBe(true);
      expect(mockLdClient.initialized).toHaveBeenCalled();
    });

    it('should return false when client is not initialized', () => {
      // Arrange
      mockLdClient.initialized.mockReturnValue(false);

      // Act      
      const result = service.isInitialized();

      // Assert
      expect(result).toBe(false);
      expect(mockLdClient.initialized).toHaveBeenCalled();
    });
  });

  describe('contextBuilder', () => {
    it('should build context with valid DTO properties', () => {
      // Arrange
      const dto: GetFeatureToggleDto = {
        kind: 'user',
        key: 'user-123',
        name: 'John Doe'
      };

      // Act
      // Access private method through any type casting for testing
      const context = (service as any).contextBuilder(dto);
      
      // Assert
      expect(context).toEqual({
        kind: 'user',
        key: 'user-123',
        name: 'John Doe'
      });
    });

    it('should use MISSING_VALUE for empty properties', () => {
      // Arrange
      const dto: GetFeatureToggleDto = {
        kind: '',
        key: '',
        name: ''
      };

      // Act
      const context = (service as any).contextBuilder(dto);
      
      // Assert
      expect(context).toEqual({
        kind: 'MISSING_VALUE',
        key: 'MISSING_VALUE',
        name: 'MISSING_VALUE'
      });
    });

    it('should use MISSING_VALUE for undefined properties', () => {
      // Arrange
      const dto: GetFeatureToggleDto = {
        kind: undefined as any,
        key: undefined as any,
        name: undefined as any
      };

      // Act
      const context = (service as any).contextBuilder(dto);
      
      // Assert
      expect(context).toEqual({
        kind: 'MISSING_VALUE',
        key: 'MISSING_VALUE',
        name: 'MISSING_VALUE'
      });
    });

    it('should handle partial missing properties', () => {
      // Arrange
      const dto: GetFeatureToggleDto = {
        kind: 'user',
        key: '',
        name: 'John Doe'
      };

      // Act
      const context = (service as any).contextBuilder(dto);
      
      // Assert
      expect(context).toEqual({
        kind: 'user',
        key: 'MISSING_VALUE',
        name: 'John Doe'
      });
    });
  });
});
