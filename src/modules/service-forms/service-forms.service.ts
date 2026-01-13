import { Injectable, NotFoundException } from '@nestjs/common';

export interface ServiceForm {
  id: string;
  requestId: string;
  technicianId: string;
  customerId: string;
  deviceCondition: string;
  problemDiagnosis: string;
  workPerformed: string;
  partsUsed: string[];
  laborHours: number;
  totalCost: number;
  customerSignature?: string;
  technicianSignature?: string;
  status: 'in-progress' | 'completed' | 'customer-approved';
  createdAt: string;
  completedAt?: string;
}

@Injectable()
export class ServiceFormsService {
  private serviceForms: ServiceForm[] = [];
  private idCounter = 1;

  create(data: Omit<ServiceForm, 'id' | 'createdAt' | 'status'>): ServiceForm {
    const form: ServiceForm = {
      id: `SF-${String(this.idCounter++).padStart(4, '0')}`,
      ...data,
      status: 'in-progress',
      createdAt: new Date().toISOString(),
    };

    this.serviceForms.push(form);
    return form;
  }

  findAll(): ServiceForm[] {
    return this.serviceForms;
  }

  findByRequest(requestId: string): ServiceForm[] {
    return this.serviceForms.filter(sf => sf.requestId === requestId);
  }

  findByTechnician(technicianId: string): ServiceForm[] {
    return this.serviceForms.filter(sf => sf.technicianId === technicianId);
  }

  findOne(id: string): ServiceForm {
    const form = this.serviceForms.find(sf => sf.id === id);
    if (!form) {
      throw new NotFoundException(`Service form with ID ${id} not found`);
    }
    return form;
  }

  update(id: string, data: Partial<ServiceForm>): ServiceForm {
    const index = this.serviceForms.findIndex(sf => sf.id === id);
    if (index === -1) {
      throw new NotFoundException(`Service form with ID ${id} not found`);
    }

    this.serviceForms[index] = {
      ...this.serviceForms[index],
      ...data,
    };

    return this.serviceForms[index];
  }

  complete(id: string): ServiceForm {
    const form = this.findOne(id);
    form.status = 'completed';
    form.completedAt = new Date().toISOString();
    return form;
  }

  approve(id: string, customerSignature: string): ServiceForm {
    const form = this.findOne(id);
    form.status = 'customer-approved';
    form.customerSignature = customerSignature;
    return form;
  }

  delete(id: string): { deleted: boolean; id: string } {
    const index = this.serviceForms.findIndex(sf => sf.id === id);
    if (index === -1) {
      throw new NotFoundException(`Service form with ID ${id} not found`);
    }

    this.serviceForms.splice(index, 1);
    return { deleted: true, id };
  }
}