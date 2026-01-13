import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ServiceFormsService } from './service-forms.service';

@Controller('service-forms')
export class ServiceFormsController {
  constructor(private readonly serviceFormsService: ServiceFormsService) {}

  @Post()
  create(@Body() createDto: any) {
    return this.serviceFormsService.create(createDto);
  }

  @Get()
  findAll(
    @Query('requestId') requestId?: string,
    @Query('technicianId') technicianId?: string,
  ) {
    if (requestId) {
      return this.serviceFormsService.findByRequest(requestId);
    }
    if (technicianId) {
      return this.serviceFormsService.findByTechnician(technicianId);
    }
    return this.serviceFormsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceFormsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.serviceFormsService.update(id, updateDto);
  }

  @Patch(':id/complete')
  complete(@Param('id') id: string) {
    return this.serviceFormsService.complete(id);
  }

  @Patch(':id/approve')
  approve(@Param('id') id: string, @Body('customerSignature') signature: string) {
    return this.serviceFormsService.approve(id, signature);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.serviceFormsService.delete(id);
  }
}