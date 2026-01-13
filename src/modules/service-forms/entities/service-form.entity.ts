import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Request } from '../../requests/entities/request.entity';

@Entity('service_forms')
export class ServiceForm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  requestId: string;

  @OneToOne(() => Request)
  @JoinColumn({ name: 'requestId' })
  request: Request;

  @Column('text')
  diagnosis: string;

  @Column('text')
  actionsTaken: string;

  @Column('jsonb', { default: [] })
  parts: Array<{ name: string; quantity: number; unitPrice: number; total: number }>;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  laborCost: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  partsCost: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  total: number;

  @Column('text', { nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}