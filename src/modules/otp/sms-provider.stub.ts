import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsProviderStub {
  async sendSms(phoneNumber: string, message: string): Promise<boolean> {
    console.log(`[SMS STUB] Sending to ${phoneNumber}: ${message}`);
    // Gerçek SMS entegrasyonu için buraya Twilio, Netgsm vb. eklenebilir
    return true;
  }
}