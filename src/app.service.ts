import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() {
    return {
      ok: true,
      message: 'Teknik Servis API çalışıyor',
      health: '/health',
      swagger: '/api',
    };
  }
}
