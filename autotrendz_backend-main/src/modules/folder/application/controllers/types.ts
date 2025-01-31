import { Folder } from '@/modules/folder/domain'
import { File } from '@/modules/folder/domain/entity'

import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator'

export class GetUploadPresignedUrlDTO {
  @IsString()
  key: string

  @IsString()
  content_type: string
}

export class CreateFolderDTO {
  @IsString()
  @IsOptional()
  parent_id: string

  @IsString()
  @Length(3, 100)
  name: string
}

export class FolderDTO {
  private constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly parent_id?: string,
    private sub_folders: FolderDTO[] = [],
    private files: FileDTO[] = [],
    private clients: { id: string; name: string }[] = [],
    private readonly created_at?: Date,
    private readonly updated_at?: Date,
  ) {}

  static fromAggregate(aggregate: Folder): FolderDTO {
    const folderDTO = new FolderDTO(
      aggregate.id.toString(),
      aggregate.name,
      aggregate.parentId ? aggregate.parentId.toString() : null,
      [],
      [],
      [],
      aggregate.createdAt,
      aggregate.updatedAt,
    )

    if (aggregate.subFolders.length) {
      folderDTO.sub_folders = aggregate.subFolders.map((folder) =>
        FolderDTO.fromAggregate(folder),
      )
    }

    if (aggregate.files.length) {
      folderDTO.files = aggregate.files.map((file) => FileDTO.fromEntity(file))
    }

    if (aggregate.clients.length) {
      folderDTO.clients = aggregate.clients.map((client) => ({
        id: client.id.toString(),
        name: client.name,
      }))
    }

    return folderDTO
  }
}

export class CreateFileDTO {
  @IsString()
  @Length(3, 100)
  name: string

  @IsString()
  mimetype: string

  @IsNumber()
  size: number
}

export class UpdateFolderDTO {
  @IsOptional()
  @IsString()
  @Length(3, 50)
  name: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  client_ids: string[]
}

export class UpdateFileDTO {
  @IsString()
  name: string
}

export class FileDTO {
  private id: string
  private parent_id?: string
  private name: string
  private src?: string
  private mimetype?: string
  private size?: number
  private created_at?: Date
  private updated_at?: Date

  static fromEntity(file: File): FileDTO {
    const fileDTO = new FileDTO()

    fileDTO.id = file.id.toString()
    fileDTO.parent_id = file.parentId ? file.parentId.toString() : null
    fileDTO.name = file.name
    fileDTO.src = file.src
    fileDTO.mimetype = file.mimetype
    fileDTO.size = file.size
    fileDTO.created_at = file.createdAt
    fileDTO.updated_at = file.updatedAt

    return fileDTO
  }
}
