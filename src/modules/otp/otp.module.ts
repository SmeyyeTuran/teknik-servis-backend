import { Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { ConfigModule } from '@nestjs/config';
import { SmsService } from './sms.service';

@Module({
  imports: [ConfigModule],
  controllers: [OtpController],
  providers: [OtpService, SmsService],
  exports: [OtpService],
})
export class OtpModule {}