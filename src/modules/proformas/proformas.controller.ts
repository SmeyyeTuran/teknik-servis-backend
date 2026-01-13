import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ProformasService, ProformaItem } from './proformas.service';

@Controller('proformas')
export class ProformasController {
  constructor(private readonly proformasService: ProformasService) {}

  @Post()
  create(
    @Body('requestId') requestId: string,
    @Body('customerId') customerId: string,
    @Body('technicianId') technicianId: string,
    @Body('items') items: ProformaItem[],
    @Body('notes') notes?: string,
  ) {
    return this.proformasService.create(requestId, customerId, technicianId, items, notes);
  }

  @Get()
  findAll(@Query('customerId') customerId?: string, @Query('requestId') requestId?: string) {
    if (customerId) {
      return this.proformasService.findByCustomer(customerId);
    }
    if (requestId) {
      return this.proformasService.findByRequest(requestId);
    }
    return this.proformasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proformasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: Partial<any>) {
    return this.proformasService.update(id, updateDto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: 'draft' | 'sent' | 'approved' | 'rejected') {
    return this.proformasService.updateStatus(id, status);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.proformasService.delete(id);
  }
}