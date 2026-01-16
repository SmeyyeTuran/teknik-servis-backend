import { IsString, MinLength, IsPhoneNumber } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;

  @IsPhoneNumber('TR')
  phone: string;

  @IsString()
  @MinLength(6)
  password: string;
}
