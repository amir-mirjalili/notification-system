import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { NotificationAttempt } from './notification-attempt.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  recipient: string;

  @Column()
  subject: string;

  @Column('jsonb')
  data: any;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => NotificationAttempt, (attempt) => attempt.notification)
  attempts: NotificationAttempt[];
}
