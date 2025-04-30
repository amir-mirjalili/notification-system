import { Injectable, Logger } from '@nestjs/common';
import { NotificationProvider } from '../notification-provider.interface';

@Injectable()
export class SendGridProvider implements NotificationProvider {
  async send(payload: any): Promise<any> {
    Logger.debug('SendGridProvider', payload);
  }

  async sendImmediate(payload: any): Promise<any> {
    Logger.debug('SendGridProvider', payload);
  }
}
