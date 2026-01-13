import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Request } from '../../requests/entities/request.entity';

@Entity('proformas')
export class Proforma {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  requestId: string;

  @OneToOne(() => Request)
  @JoinColumn({ name: 'requestId' })
  request: Request;

  @Column()
  pdfPath: string;

  @Column()
  proformaNumber: string;

  @CreateDateColumn()
  createdAt: Date;
}