import { IsNotEmpty, IsString } from 'class-validator';

export class SendNotificationDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  recipient: string;

  @IsString()
  @IsNotEmpty()
  subject: string;
}
