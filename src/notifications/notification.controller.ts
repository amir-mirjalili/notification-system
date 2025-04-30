import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './application/service/notification.service';
import { SendNotificationDto } from './dto/send-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('send')
  async send(@Body() body: SendNotificationDto) {
    return this.notificationService.send(body.type, {
      recipient: body.recipient,
      subject: body.subject,
    });
  }

  @Post('send-immediate')
  async sendImmediate(@Body() body: SendNotificationDto) {
    return this.notificationService.sendImmediate(body.type, {
      recipient: body.recipient,
      subject: body.subject,
    });
  }
}
