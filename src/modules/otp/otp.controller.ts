import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiTags, ApiExtraModels, getSchemaPath, ApiConsumes } from '@nestjs/swagger';
import { OtpService } from './otp.service';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@ApiExtraModels(VerifyOtpDto)
@ApiTags('otp')
@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('verify')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        phone: {
          type: 'string',
          example: '+905XXXXXXXXX',
        },
        code: {
          type: 'string',
          example: '123456',
        },
      },
      required: ['phone', 'code'],
    },
  })
  async verifyOtp(@Body() body: VerifyOtpDto) {

    const { phone, code } = body;
    const isValid = await this.otpService.verify(phone, code);
    return { success: isValid };
  }
}
