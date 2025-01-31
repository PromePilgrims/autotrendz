import { AppController } from '@/app.controller'

import {
  ClientModule,
  PowerBiModule,
  AuthModule,
  FolderModule,
  ReportModule,
  LanguageModule,
  WebModule,
  YmhQuestionnaireModule,
  AudatexModule,
} from '@/modules'

import { ConfigModule, ConfigService } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { BullModule } from '@nestjs/bullmq'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        entities: ['dist/**/*.entity.js'],
        useUTC: true,
        synchronize: true,
        logger: 'advanced-console',
        logging: ['error'],
      }),
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get<number>('THROTTLE_TTL'),
          limit: config.get<number>('THROTTLE_LIMIT'),
        },
      ],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get('REDIS_HOST'),
          port: config.get<number>('REDIS_PORT'),
        },
      }),
    }),
    ClientModule,
    AuthModule,
    PowerBiModule,
    FolderModule,
    ReportModule,
    LanguageModule,
    WebModule,
    YmhQuestionnaireModule,
    AudatexModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
