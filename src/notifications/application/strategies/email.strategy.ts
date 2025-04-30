import { Injectable } from '@nestjs/common';
import { NotificationStrategy } from './notification-strategy.interface';
import { ProviderStrategy } from '../../providers/provider-strategy';

@Injectable()
export class EmailStrategy implements NotificationStrategy {
  constructor(private readonly providerStrategy: ProviderStrategy) {}

  async send(payload: any): Promise<any> {
    const provider = this.providerStrategy.getProvider('EMAIL');
    return provider.send(payload);
  }

  async sendImmediate(payload: any): Promise<any> {
    const provider = this.providerStrategy.getProvider('EMAIL');
    return provider.sendImmediate(payload);
  }
}
