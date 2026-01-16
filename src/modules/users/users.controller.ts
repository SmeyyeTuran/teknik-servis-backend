import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { UserRole } from './entities/user.entity';
import { ParseEnumPipe } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createDto: any) {
    return this.usersService.create(createDto);
  }

  
  @Get()
  findByRole(
    @Query('role', new ParseEnumPipe(UserRole)) role?: UserRole,
  ) {
    if (role) {
      return this.usersService.findByRole(role);
    }
    return this.usersService.findAll();
  }

  @Get('phone/:phone')
  findByPhone(@Param('phone') phone: string) {
    return this.usersService.findByPhone(phone);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.usersService.update(id, updateDto);
  }

  @Patch(':id/verify-phone')
  verifyPhone(@Param('id') id: string) {
    return this.usersService.verifyPhone(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}