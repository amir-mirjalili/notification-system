import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue, Worker, Job } from 'bullmq';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationAttempt } from './entities/notification-attempt.entity';
import { Notification } from './entities/notification.entity';
import { EmailStrategy } from './application/strategies/email.strategy';

@Injectable()
export class NotificationWorker implements OnModuleInit {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
    @InjectRepository(NotificationAttempt)
    private readonly attemptRepo: Repository<NotificationAttempt>,
    private readonly emailStrategy: EmailStrategy,
    @InjectQueue('notification')
    private readonly notificationQueue: Queue,
  ) {}

  onModuleInit() {
    new Worker(
      'notification',
      async (job: Job) => {
        const { type, payload, notificationId } = job.data;

        const notification = await this.notificationRepo.findOne({
          where: { id: notificationId },
        });

        if (!notification) {
          console.error(`Notification ${notificationId} not found`);
          return;
        }

        let status: 'SUCCESS' | 'FAILED' = 'SUCCESS';
        let errorMessage: string | undefined;

        try {
          await this.emailStrategy.send(payload);
          notification.status = 'SENT';
        } catch (error) {
          console.error(error);
          status = 'FAILED';
          errorMessage = error.message;
          notification.status = 'FAILED';
        }

        await this.notificationRepo.save(notification);
        await this.attemptRepo.save({
          notification,
          status,
          response: errorMessage,
        });
      },
      {
        connection: {
          host: 'localhost',
          port: 6379,
        },
      },
    );
  }
}
