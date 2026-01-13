import { Injectable, NotFoundException } from '@nestjs/common';

export interface ProformaItem {
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Proforma {
  id: string;
  requestId: string;
  customerId: string;
  technicianId: string;
  items: ProformaItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'approved' | 'rejected';
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

@Injectable()
export class ProformasService {
  private proformas: Proforma[] = [];
  private idCounter = 1;

  create(requestId: string, customerId: string, technicianId: string, items: ProformaItem[], notes?: string): Proforma {
    const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
    const tax = subtotal * 0.20; // %20 KDV
    const total = subtotal + tax;

    const proforma: Proforma = {
      id: `PRF-${String(this.idCounter++).padStart(4, '0')}`,
      requestId,
      customerId,
      technicianId,
      items,
      subtotal,
      tax,
      total,
      status: 'draft',
      notes,
      createdAt: new Date().toISOString(),
    };

    this.proformas.push(proforma);
    return proforma;
  }

  findAll(): Proforma[] {
    return this.proformas;
  }

  findByCustomer(customerId: string): Proforma[] {
    return this.proformas.filter(p => p.customerId === customerId);
  }

  findByRequest(requestId: string): Proforma[] {
    return this.proformas.filter(p => p.requestId === requestId);
  }

  findOne(id: string): Proforma {
    const proforma = this.proformas.find(p => p.id === id);
    if (!proforma) {
      throw new NotFoundException(`Proforma with ID ${id} not found`);
    }
    return proforma;
  }

  update(id: string, data: Partial<Proforma>): Proforma {
    const index = this.proformas.findIndex(p => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Proforma with ID ${id} not found`);
    }

    this.proformas[index] = {
      ...this.proformas[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    return this.proformas[index];
  }

  updateStatus(id: string, status: Proforma['status']): Proforma {
    return this.update(id, { status });
  }

  delete(id: string): { deleted: boolean; id: string } {
    const index = this.proformas.findIndex(p => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Proforma with ID ${id} not found`);
    }

    this.proformas.splice(index, 1);
    return { deleted: true, id };
  }
}