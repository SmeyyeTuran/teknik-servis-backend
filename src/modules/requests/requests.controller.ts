import { Controller, Post, Get, Body, Request, UseGuards } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { FirebaseAuthGuard } from '../../common/guards/firebase-auth.guard';
import { PhoneVerifiedGuard } from '../../common/guards/phone-verified.guard';

@UseGuards(FirebaseAuthGuard, PhoneVerifiedGuard)
@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  async create(@Body() createRequestDto: CreateRequestDto, @Request() req) {
    // userId'yi token'dan veya session'dan alın
    const userId = req.user?.userId || 'demo-user-id'; 
    return this.requestsService.create({ ...createRequestDto, userId });
  }

  @Get()
  async findAll(@Request() req) {
    const userId = req.user?.userId || 'demo-user-id';
    return this.requestsService.findByUserId(userId);
  }
}