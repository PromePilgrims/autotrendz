import {
  ExecuteScrap,
  ListExecutions,
  StartScrapExecution,
} from '@/modules/audatex/domain/use-cases'
import { AudatexController } from '@/modules/audatex/application/controllers'
import { S3FileService } from '@/modules/@shared/infra/services'
import { ExecutionEntity } from '@/modules/audatex/infra/database/entity'
import { AudatexProcessor } from '@/modules/audatex/application/processor'
import { AudatexExecutionRepository } from '@/modules/audatex/infra/database'
import { TokenService, ScrapperService } from '@/modules/audatex/infra/services'

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BullModule } from '@nestjs/bullmq'
import { HttpModule } from '@nestjs/axios'
import { CacheModule } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-redis-yet'
import { ConfigService } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'

@Module({
  imports: [
    TypeOrmModule.forFeature([ExecutionEntity]),
    MulterModule.register({
      fileFilter: (_, file, cb) => {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString(
          'utf8',
        )
        cb(null, true)
      },
    }),
    BullModule.registerQueue({
      name: 'audatex',
    }),
    HttpModule,
    CacheModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          socket: {
            host: configService.get('REDIS_HOST'),
            port: configService.get<number>('REDIS_PORT'),
          },
        }),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AudatexController],
  providers: [
    {
      provide: 'FileService',
      useClass: S3FileService,
    },
    {
      provide: AudatexExecutionRepository.name,
      useClass: AudatexExecutionRepository,
    },
    TokenService,
    {
      provide: 'ScrapperService',
      useClass: ScrapperService,
    },
    StartScrapExecution,
    ListExecutions,
    ExecuteScrap,
    AudatexProcessor,
  ],
})
export class AudatexModule {}
