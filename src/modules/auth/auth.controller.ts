import { 
  Controller, 
  Post, 
  Get, 
  Body, 
  Headers, 
  UnauthorizedException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SendOtpDto } from './dto/send-otp.dto';

import { UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from '../../common/guards/firebase-auth.guard';
import { PhoneVerifiedGuard } from '../../common/guards/phone-verified.guard';

@Controller('auth')

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Kullanıcı kaydı
   * POST /api/v1/auth/register
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  /**
   * Giriş için OTP gönder
   * POST /api/v1/auth/send-otp
   */
  @Post('send-otp')
  @HttpCode(HttpStatus.OK)
  async sendOtp(@Body() sendOtpDto: SendOtpDto) {
    return this.authService.sendLoginOtp(sendOtpDto.phone);
  }

  /**
   * OTP ile giriş
   * POST /api/v1/auth/login
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * Token doğrula
   * GET /api/v1/auth/me
   */
  @UseGuards(FirebaseAuthGuard)
  @Get('me')
  async getProfile(@Headers('authorization') authorization: string) {
    if (!authorization) {
      throw new UnauthorizedException('No authorization header');
    }

    const token = authorization.replace('Bearer ', '');
    return this.authService.validateToken(token);
  }

  /**
   * Çıkış yap
   * POST /api/v1/auth/logout
   */
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Headers('authorization') authorization: string) {
    if (!authorization) {
      throw new UnauthorizedException('No authorization header');
    }

    const token = authorization.replace('Bearer ', '');
    const user = await this.authService.validateToken(token);
    return this.authService.logout(user.id);
  }
}