import { Module } from '@nestjs/common';
import { ServiceFormsController } from './service-forms.controller';
import { ServiceFormsService } from './service-forms.service';

@Module({
  controllers: [ServiceFormsController],
  providers: [ServiceFormsService],
  exports: [ServiceFormsService],
})
export class ServiceFormsModule {}