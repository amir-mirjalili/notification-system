import { Module } from '@nestjs/common';
import { EmailStrategy } from './application/strategies/email.strategy';
import { NotificationController } from './notification.controller';
import { NotificationService } from './application/service/notification.service';
import { ProviderStrategy } from './providers/provider-strategy';
import { SendGridProvider } from './providers/email/sendgrid.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationAttempt } from './entities/notification-attempt.entity';
import { Notification } from './entities/notification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, NotificationAttempt])],
  providers: [
    ProviderStrategy,
    SendGridProvider,
    EmailStrategy,
    NotificationService,
  ],
  controllers: [NotificationController],
})
export class NotificationModule {}
