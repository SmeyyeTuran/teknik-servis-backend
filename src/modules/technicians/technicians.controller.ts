import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { TechniciansService } from './technicians.service';

@Controller('technicians')
export class TechniciansController {
  constructor(private readonly techniciansService: TechniciansService) {}

  @Post()
  create(@Body() createDto: any) {
    return this.techniciansService.create(createDto);
  }

  @Get()
  findAll(@Query('available') available?: string, @Query('specialization') specialization?: string) {
    if (available === 'true') {
      return this.techniciansService.findAvailable();
    }
    if (specialization) {
      return this.techniciansService.findBySpecialization(specialization);
    }
    return this.techniciansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.techniciansService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.techniciansService.update(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.techniciansService.delete(id);
  }
}