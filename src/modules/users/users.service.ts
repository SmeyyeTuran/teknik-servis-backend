import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';

import { UserRole } from './entities/user.entity';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  role: UserRole;
  phoneVerified: boolean;
  createdAt: string;
  updatedAt?: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 'USER-001',
      firstName: 'Test',
      lastName: 'Müşteri',
      phoneNumber: '+905551234567',
      email: 'test@customer.com',
      role: UserRole.CUSTOMER,
      phoneVerified: true,
      createdAt: '2024-01-01T00:00:00.000Z',
    },

  ];
  private idCounter = 2;

  create(data: Omit<User, 'id' | 'createdAt' | 'phoneVerified'>): User {
    const exists = this.users.find(u => u.phoneNumber === data.phoneNumber);
    if (exists) {
      throw new ConflictException('Phone number already registered');
    }

    const user: User = {
      id: `USER-${String(this.idCounter++).padStart(3, '0')}`,
      ...data,
      phoneVerified: false,
      createdAt: new Date().toISOString(),
    };

    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findByRole(role: User['role']): User[] {
    return this.users.filter(u => u.role === role);
  }

  findOne(id: string): User {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  findByPhone(phone: string): User | undefined {
    return this.users.find(u => u.phone === phone);
  }

  update(id: string, data: Partial<User>): User {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    this.users[index] = {
      ...this.users[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    return this.users[index];
  }

  verifyPhone(id: string): User {
    return this.update(id, { phoneVerified: true });
  }

  delete(id: string): { deleted: boolean; id: string } {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    this.users.splice(index, 1);
    return { deleted: true, id };
  }
}