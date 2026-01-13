import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot() {
    return {
      message: 'Narimaj Teknik Servis API',
      version: '1.0',
      status: 'running',
      endpoints: {
        health: '/api/v1/health',
        swagger: '/api',
        auth: '/api/v1/auth/*',
        users: '/api/v1/users',
        requests: '/api/v1/requests',
      },
      timestamp: new Date().toISOString(),
    };
  }
}
