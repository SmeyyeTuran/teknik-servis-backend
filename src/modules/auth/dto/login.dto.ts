import { IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsPhoneNumber('TR', { message: 'Invalid phone number format' })
  @IsNotEmpty({ message: 'Phone number is required' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'OTP code is required' })
  @Length(6, 6, { message: 'OTP code must be 6 digits' })
  otpCode: string;
}