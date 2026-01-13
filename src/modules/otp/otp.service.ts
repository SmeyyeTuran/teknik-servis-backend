import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import twilio from 'twilio';
import { SmsService } from './sms.service';

@Injectable()
export class OtpService {
  private readonly logger = new Logger(OtpService.name);
  private twilioClient: twilio.Twilio;
  private otpStore = new Map<string, { code: string; expiresAt: number }>();

  constructor(private configService: ConfigService, private smsService: SmsService) {
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
    
    if (accountSid && authToken) {
      this.twilioClient = twilio(accountSid, authToken);
    }
  }

  private generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendOTP(phoneNumber: string): Promise<{ message: string; sid?: string }> {
    const code = this.generateOTP();
    const expiresAt = Date.now() + 5 * 60 * 1000;

    this.otpStore.set(phoneNumber, { code, expiresAt });

    // Geliştirme ortamında konsola yazdır
    console.log(`📱 ${phoneNumber} için OTP kodu: ${code}`);
    
    await this.smsService.send({
      to: phoneNumber,
      message: `Teknik Servis doğrulama kodunuz: ${code}`
    });
    
    return {
      message: 'OTP başarıyla gönderildi',
      sid: '', // SMS gönderiminde kullanılmadığı için boş bırakıldı
    };
  }

  async verifyOTP(phoneNumber: string, code: string): Promise<boolean> {
    const stored = this.otpStore.get(phoneNumber);
    
    if (!stored) return false;
    if (Date.now() > stored.expiresAt) {
      this.otpStore.delete(phoneNumber);
      return false;
    }
    
    if (stored.code === code) {
      this.otpStore.delete(phoneNumber);
      return true;
    }
    
    return false;
  }

  // Auth service için uyumlu metodlar
  async generate(phoneNumber: string): Promise<void> {
    await this.sendOTP(phoneNumber);
  }

  async verify(phoneNumber: string, code: string): Promise<boolean> {
    const result = await this.verifyOTP(phoneNumber, code);
    return result;
  }

  async clear(phoneNumber: string): Promise<void> {
    // Twilio Verify otomatik temizler, manuel işlem gerekmez
    this.logger.log(`OTP cleared for ${phoneNumber}`);
  }
}