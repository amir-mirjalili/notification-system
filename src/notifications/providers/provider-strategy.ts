import { Injectable } from '@nestjs/common';
import { NotificationProvider } from './notification-provider.interface';
import { SendGridProvider } from './email/sendgrid.provider';

@Injectable()
export class ProviderStrategy {
  constructor(private readonly sendGridProvider: SendGridProvider) {}

  getProvider(type: string): NotificationProvider {
    switch (type.toUpperCase()) {
      case 'EMAIL':
        return this.sendGridProvider;
      default:
        throw new Error(`No provider found for type: ${type}`);
    }
  }
}
