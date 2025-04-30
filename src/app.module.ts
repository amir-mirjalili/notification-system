import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationModule } from './notifications/notification.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NotificationModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: parseInt(config.get('DB_PORT') || '', 10),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity.{ts,js}'],
        migrations: [__dirname + '/database/migrations/*.{ts,js}'],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
