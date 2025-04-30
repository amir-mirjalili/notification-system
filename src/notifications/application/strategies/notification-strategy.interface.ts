export interface NotificationStrategy {
  send(payload: any): Promise<any>;
  sendImmediate(payload: any): Promise<any>;
}
