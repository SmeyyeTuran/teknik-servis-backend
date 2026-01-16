import { IsString, MinLength, IsPhoneNumber } from 'class-validator';
console.log('🔥 NEW REGISTER DTO LOADED 🔥');
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
