import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Notification } from './notification.entity';

@Entity('notification_attempts')
export class NotificationAttempt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Notification, (notification) => notification.attempts)
  notification: Notification;

  @Column({ type: 'text', nullable: true })
  response: string;

  @Column()
  status: string; //PENDING QUEUED FAILED SENT

  @CreateDateColumn()
  createdAt: Date;
}
