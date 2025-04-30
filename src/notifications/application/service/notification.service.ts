import { Injectable } from '@nestjs/common';
import { NotificationStrategy } from '../strategies/notification-strategy.interface';
import { EmailStrategy } from '../strategies/email.strategy';
import { NotificationAttempt } from '../../entities/notification-attempt.entity';
import { Notification } from '../../entities/notification.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NotificationService {
  private readonly strategyMap: Record<string, NotificationStrategy>;

  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
    @InjectRepository(NotificationAttempt)
    private readonly attemptRepo: Repository<NotificationAttempt>,
    private readonly emailStrategy: EmailStrategy,
  ) {
    this.strategyMap = {
      email: this.emailStrategy,
      // add other strategies (e.g., sms: this.smsStrategy)
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
      data: { template: '', templateData: '' },
    });
    await this.notificationRepo.save(notification);

    let status: 'SUCCESS' | 'FAILED' = 'SUCCESS';
    let errorMessage: string | undefined;
    try {
      const strategy = this.getStrategy(type);

      await strategy.send(payload);
    } catch (error) {
      console.log(error.message);
      status = 'FAILED';
      errorMessage = error.message;
    }
    await this.attemptRepo.save({
      notification,
      status,
      response: errorMessage,
    });
    return { status, notificationId: notification.id };
  }

  async sendImmediate(type: string, payload: any): Promise<any> {
    const strategy = this.getStrategy(type);
    return strategy.sendImmediate(payload);
  }
}
