import {
  CreateClient,
  DeleteClient,
  ListClient,
  ListClients,
  UpdateClient,
} from '@/modules/client/domain/use-cases'
import { ClientController } from '@/modules/client/application/controllers'
import { ClientRepository } from '@/modules/client/infra/database'
import { ClientEntity } from '@/modules/client/infra/database/entities'
import { ClientService, EmailService } from '@/modules/client/infra'
import { S3FileService } from '@/modules/@shared/infra/services'

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity])],
  controllers: [ClientController],
  providers: [
    {
      provide: ClientRepository.name,
      useClass: ClientRepository,
    },
    {
      provide: 'FileService',
      useClass: S3FileService,
    },
    CreateClient,
    UpdateClient,
    ListClient,
    ListClients,
    DeleteClient,
    {
      provide: ClientService.name,
      useClass: ClientService,
    },
    {
      provide: 'EmailService',
      useClass: EmailService,
    },
  ],
  exports: [
    {
      provide: ClientService.name,
      useClass: ClientService,
    },
    {
      provide: ClientRepository.name,
      useClass: ClientRepository,
    },
    {
      provide: EmailService.name,
      useClass: EmailService,
    },
  ],
})
export class ClientModule {}
