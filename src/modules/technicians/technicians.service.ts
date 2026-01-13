import { Injectable, NotFoundException } from '@nestjs/common';

export interface Technician {
  id: string;
  name: string;
  phone: string;
  email: string;
  specialization: string[];
  available: boolean;
  rating: number;
  completedJobs: number;
  createdAt: string;
  updatedAt?: string;
}

@Injectable()
export class TechniciansService {
  private technicians: Technician[] = [
    {
      id: 'TECH-001',
      name: 'Ahmet Yılmaz',
      phone: '+905551234567',
      email: 'ahmet@narimaj.com',
      specialization: ['Laptop', 'Desktop', 'Tablet'],
      available: true,
      rating: 4.8,
      completedJobs: 127,
      createdAt: '2024-01-01T00:00:00.000Z',
    },
    {
      id: 'TECH-002',
      name: 'Mehmet Demir',
      phone: '+905559876543',
      email: 'mehmet@narimaj.com',
      specialization: ['Smartphone', 'Tablet'],
      available: true,
      rating: 4.5,
      completedJobs: 89,
      createdAt: '2024-01-15T00:00:00.000Z',
    },
  ];
  private idCounter = 3;

  create(data: Omit<Technician, 'id' | 'createdAt' | 'rating' | 'completedJobs'>): Technician {
    const technician: Technician = {
      id: `TECH-${String(this.idCounter++).padStart(3, '0')}`,
      ...data,
      rating: 0,
      completedJobs: 0,
      createdAt: new Date().toISOString(),
    };

    this.technicians.push(technician);
    return technician;
  }

  findAll(): Technician[] {
    return this.technicians;
  }

  findAvailable(): Technician[] {
    return this.technicians.filter(t => t.available);
  }

  findBySpecialization(specialization: string): Technician[] {
    return this.technicians.filter(t => 
      t.specialization.some(s => s.toLowerCase() === specialization.toLowerCase())
    );
  }

  findOne(id: string): Technician {
    const technician = this.technicians.find(t => t.id === id);
    if (!technician) {
      throw new NotFoundException(`Technician with ID ${id} not found`);
    }
    return technician;
  }

  update(id: string, data: Partial<Technician>): Technician {
    const index = this.technicians.findIndex(t => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Technician with ID ${id} not found`);
    }

    this.technicians[index] = {
      ...this.technicians[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    return this.technicians[index];
  }

  delete(id: string): { deleted: boolean; id: string } {
    const index = this.technicians.findIndex(t => t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Technician with ID ${id} not found`);
    }

    this.technicians.splice(index, 1);
    return { deleted: true, id };
  }
}