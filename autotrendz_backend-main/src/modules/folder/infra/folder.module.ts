import {
  AddFile,
  AddFolder,
  ListFolder,
  ListFolders,
  UpdateFile,
  UpdateFolder,
} from '@/modules/folder/domain/use-cases'
import { FolderController } from '@/modules/folder/application/controllers'
import { FolderRepository } from '@/modules/folder/infra/database'
import { S3FileService } from '@/modules/@shared/infra/services'
import {
  FileEntity,
  FolderEntity,
} from '@/modules/folder/infra/database/entity'

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([FolderEntity, FileEntity])],
  controllers: [FolderController],
  providers: [
    {
      provide: FolderRepository.name,
      useClass: FolderRepository,
    },
    {
      provide: 'FileService',
      useClass: S3FileService,
    },
    AddFolder,
    ListFolders,
    ListFolder,
    UpdateFolder,
    AddFile,
    UpdateFile,
  ],
})
export class FolderModule {}
