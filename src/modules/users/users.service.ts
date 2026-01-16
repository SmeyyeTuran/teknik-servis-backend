import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';

import { UserRole } from './entities/user.entity';

export type CreateUserInput = {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  role: UserRole;
};

export interface UserModel {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  role: UserRole;
  phoneVerified: boolean;
  createdAt: string;
  updatedAt?: string;
}

@Injectable()
export class UsersService {
  private users: UserModel[] = [
    {
      id: 'USER-001',
      firstName: 'Test',
      lastName: 'Müşteri',
      phone: '+905551234567',
      email: 'test@customer.com',
      role: UserRole.CUSTOMER,
      phoneVerified: true,
      createdAt: '2024-01-01T00:00:00.000Z',
    },

  ];
  private idCounter = 2;

  async create(data: CreateUserInput): Promise<UserModel> {
    const exists = this.users.find(u => u.phone === data.phone);
    if (exists) {
      throw new ConflictException('Phone number already registered');
    }

    const user: UserModel = {
      id: `USER-${String(this.idCounter++).padStart(3, '0')}`,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      role: data.role,
      phoneVerified: false,
      createdAt: new Date().toISOString(),
    };


    this.users.push(user);
    return user;
  }

  findAll(): UserModel[] {
    return this.users;
  }

  findByRole(role: UserModel['role']): UserModel[] {
    return this.users.filter(u => u.role === role);
  }

  findOne(id: string): UserModel {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  findByPhone(phone: string): UserModel | undefined {
    return this.users.find(u => u.phone === phone);
  }

  update(id: string, data: Partial<UserModel>): UserModel {
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

  verifyPhone(id: string): UserModel {
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