import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth(): Promise<{ status: string, timestamp: string, launchDarkly: boolean }> {
    return this.appService.getHealth();
  }
}
