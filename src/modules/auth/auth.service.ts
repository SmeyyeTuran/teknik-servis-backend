import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { OtpService } from '../otp/otp.service';
import { RegisterDto, LoginDto, SendOtpDto } from './dto';
import { UserRole } from '../users/entities/user.entity';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private otpService: OtpService,
  ) {}

  /**
   * Kullanıcı kayıt
   */
  async register(registerDto: RegisterDto) {
    const { firstName, lastName, phone, email } = registerDto;
    const cleanPhone = phone.replace(/[^0-9+]/g, '');

    // Kullanıcı zaten var mı kontrol et
    const existingUser = await this.usersService.findByPhone(cleanPhone);
    if (existingUser) {
      throw new BadRequestException('Phone number already registered');
    }

    // Yeni kullanıcı oluştur
    const user = await this.usersService.create({
      firstName,
      lastName,
      phone: cleanPhone,
      email,
      role: UserRole.CUSTOMER,
    });

    // OTP gönder
    await this.otpService.generate(cleanPhone);

    return {
      success: true,
      message: 'Registration successful. OTP sent to your phone.',
      userId: user.id,
    };
  }

  /**
   * OTP ile giriş
   */
  async login(loginDto: LoginDto) {
    const { phone, otpCode } = loginDto;
    const cleanPhone = phone.replace(/[^0-9+]/g, '');

    // Kullanıcı var mı kontrol et
    const user = await this.usersService.findByPhone(cleanPhone);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // OTP doğrula
    const isOtpValid = await this.otpService.verify(cleanPhone, otpCode);
    if (!isOtpValid) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    // Telefonu doğrulanmış olarak işaretle
    if (!user.phoneVerified) {
      await this.usersService.verifyPhone(user.id);
    }

    // JWT token oluştur
    const payload = {
      sub: user.id,
      phone: user.phone,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      success: true,
      accessToken,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        role: user.role,
      },
    };
  }

  /**
   * OTP gönder (giriş için)
   */
  async sendLoginOtp(phone: string) {
    const cleanPhone = phone.replace(/[^0-9+]/g, '');

    // Kullanıcı var mı kontrol et
    const user = await this.usersService.findByPhone(cleanPhone);
    if (!user) {
      throw new BadRequestException('User not found. Please register first.');
    }

    // OTP gönder
    await this.otpService.generate(cleanPhone);

    return {
      success: true,
      message: 'OTP sent to your phone',
    };
  }

  /**
   * Token doğrula ve kullanıcı bilgilerini al
   */
  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findOne(payload.sub);

      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        role: user.role,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  /**
   * JWT Strategy için kullanıcı doğrulama
   */
  async validateUser(userId: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      role: user.role,
    };
  }

  /**
   * Çıkış yap (OTP temizle)
   */
  async logout(userId: string) {
    const user = await this.usersService.findOne(userId);
    await this.otpService.clear(user.phone);

    return {
      success: true,
      message: 'Logged out successfully',
    };
  }
}