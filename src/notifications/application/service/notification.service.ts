import { Injectable } from '@nestjs/common';
import { NotificationStrategy } from '../strategies/notification-strategy.interface';
import { EmailStrategy } from '../strategies/email.strategy';
import { NotificationAttempt } from '../../entities/notification-attempt.entity';
import { Notification } from '../../entities/notification.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class NotificationService {
  private readonly strategyMap: Record<string, NotificationStrategy>;

  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
    @InjectRepository(NotificationAttempt)
    private readonly attemptRepo: Repository<NotificationAttempt>,
    private readonly emailStrategy: EmailStrategy,
    @InjectQueue('notification')
    private readonly notificationQueue: Queue,
  ) {
    this.strategyMap = {
      email: this.emailStrategy,
      // other strategies: sms, push, etc.
    };
  }

  private getStrategy(type: string): NotificationStrategy {
    const strategy = this.strategyMap[type.toLowerCase()];
    if (!strategy) {
      throw new Error(`Unsupported notification type: ${type}`);
    }
    return strategy;
  }

  async send(type: string, payload: any): Promise<any> {
    const notification = this.notificationRepo.create({
      type,
      recipient: payload.recipient,
      subject: payload.subject,
      data: {
        template: '',
        templateData: '',
      },
      status: 'PENDING',
    });

    await this.notificationRepo.save(notification);

    const notificationAttempt = this.attemptRepo.create({
      notification,
      status: 'PENDING',
    });

    await this.attemptRepo.save(notificationAttempt);

    await this.notificationQueue.add('send-notification', {
      notificationId: notification.id,
      type,
      payload,
    });

    return { status: 'QUEUED', notificationId: notification.id };
  }

  async sendImmediate(type: string, payload: any): Promise<any> {
    const strategy = this.getStrategy(type);
    await strategy.sendImmediate(payload);
    const notification = this.notificationRepo.create({
      type,
      recipient: payload.recipient,
      subject: payload.subject,
      data: {
        template: '',
        templateData: '',
      },
      status: 'SENT',
    });

    await this.notificationRepo.save(notification);
    const notificationAttempt = this.attemptRepo.create({
      notification,
      status: 'PENDING',
    });

    await this.attemptRepo.save(notificationAttempt);
    return { status: 'SENT', notificationId: notification.id };
  }
}
