import { IsPhoneNumber, IsNotEmpty } from 'class-validator';

export class SendOtpDto {
  @IsPhoneNumber('TR', { message: 'Invalid phone number format' })
  @IsNotEmpty({ message: 'Phone number is required' })
  phone: string;
}