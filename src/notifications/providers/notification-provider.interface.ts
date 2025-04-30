export interface NotificationProvider {
  send(payload: any): Promise<any>;
  sendImmediate(payload: any): Promise<any>;
}
