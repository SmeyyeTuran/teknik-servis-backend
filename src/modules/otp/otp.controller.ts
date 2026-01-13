import { Controller, Post, Body } from '@nestjs/common';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  /**
   * OTP gönder
   * POST /api/v1/otp/send
   */
  @Post('send')
  async sendOtp(@Body('phoneNumber') phoneNumber: string) {
    return this.otpService.sendOTP(phoneNumber); // sendOtp → sendOTP
  }

  /**
   * OTP doğrula
   * POST /api/v1/otp/verify
   */
  @Post('verify')
  async verifyOtp(@Body() body: { phoneNumber: string; code: string }) {
    const { phoneNumber, code } = body;
    const isValid = await this.otpService.verifyOTP(phoneNumber, code); // verifyOtp → verifyOTP
    return { success: isValid, message: isValid ? 'Kod doğrulandı' : 'Geçersiz kod' };
  }
}