import { Injectable } from '@nestjs/common';
import { NotificationProvider } from '../notification-provider.interface';

@Injectable()
export class SendGridProvider implements NotificationProvider {
  async send(payload: any): Promise<any> {
    console.log('SendGridProvider', payload);
  }

  async sendImmediate(payload: any): Promise<any> {
    console.log('SendGridProvider sendImmediate', payload);
  }
}
