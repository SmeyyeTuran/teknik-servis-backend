import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum NotificationType {
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  PUSH = 'PUSH'
}

export enum NotificationPurpose {
  SERVICE = 'SERVICE',
  MARKETING = 'MARKETING'
}

@Entity('notification_logs')
export class NotificationLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'enum', enum: NotificationType })
  type: NotificationType;

  @Column({ type: 'enum', enum: NotificationPurpose })
  purpose: NotificationPurpose;

  @Column()
  recipient: string;

  @Column('text')
  message: string;

  @Column({ default: false })
  sent: boolean;

  @Column('text', { nullable: true })
  error: string;

  @CreateDateColumn()
  createdAt: Date;
}