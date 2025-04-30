import { Module } from '@nestjs/common';
import { EmailStrategy } from './application/strategies/email.strategy';
import { NotificationController } from './notification.controller';
import { NotificationService } from './application/service/notification.service';
import { ProviderStrategy } from './providers/provider-strategy';
import { SendGridProvider } from './providers/email/sendgrid.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationAttempt } from './entities/notification-attempt.entity';
import { Notification } from './entities/notification.entity';
import { NotificationWorker } from './notification.worker';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification, NotificationAttempt]),
    BullModule.registerQueue({
      name: 'notification',
    }),
  ],
  providers: [
    ProviderStrategy,
    SendGridProvider,
    EmailStrategy,
    NotificationService,
    NotificationWorker,
  ],
  controllers: [NotificationController],
})
export class NotificationModule {}
