import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class SmsService {
  constructor(private configService: ConfigService) {}

  async send(params: { to: string; message: string }): Promise<void> {
    const apiUrl = 'https://api.netgsm.com.tr/sms/send/get';
    
    const response = await axios.get(apiUrl, {
      params: {
        usercode: this.configService.get('SMS_USER'),
        password: this.configService.get('SMS_PASS'),
        gsmno: params.to.replace('+90', ''),
        message: params.message,
        msgheader: this.configService.get('SMS_HEADER')
      }
    });

    if (response.data !== '00') {
      throw new Error('SMS gönderilemedi');
    }
  }
}