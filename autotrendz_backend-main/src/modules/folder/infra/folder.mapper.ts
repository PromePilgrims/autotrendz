import { Folder } from '@/modules/folder/domain'
import { FolderId } from '@/modules/folder/domain/entity'
import { FolderEntity } from '@/modules/folder/infra/database/entity'
import { ClientId } from '@/modules/client/domain'
import { ClientEntity } from '@/modules/client/infra/database/entities'
import { UniqueEntityID } from '@/modules/@shared/domain'
import { FileMapper } from '@/modules/folder/infra/file.mapper'

export class FolderMapper {
  static toDomain({
    id,
    name,
    parent_id,
    sub_folders,
    files,
    clients,
    created_by,
    created_at,
    updated_at,
  }: FolderEntity): Folder {
    const folder = Folder.create({
      id: FolderId.create(new UniqueEntityID(id)),
      name,
      parent_id,
      created_by,
      created_at,
      updated_at,
    })

    if (clients) {
      folder.changeClients(
        clients.map(({ id, name }) => ({
          id: ClientId.create(new UniqueEntityID(id)),
          name,
        })),
      )
    }

    if (sub_folders && sub_folders.length > 0) {
      for (const sub_folder of sub_folders) {
        folder.addSubFolder(FolderMapper.toDomain(sub_folder))
      }
    }

    if (files && files.length > 0) {
      files.map((file) => folder.addFile(FileMapper.toDomain(file)))
    }

    return folder
  }

  static toEntity(domainEntity: Folder): FolderEntity {
    const entity = new FolderEntity()

    entity.id = domainEntity.id.toString()
    entity.parent_id = domainEntity.parentId
      ? domainEntity.parentId?.toString()
      : null
    entity.name = domainEntity.name
    entity.created_by = domainEntity.createdBy
    entity.created_at = domainEntity.createdAt
    entity.updated_at = domainEntity.updatedAt

    if (domainEntity.subFolders.length)
      entity.sub_folders = domainEntity.subFolders.map((subFolder) =>
        FolderMapper.toEntity(subFolder),
      )

    if (domainEntity.files.length)
      entity.files = domainEntity.files.map((file) => FileMapper.toEntity(file))

    entity.clients = domainEntity.clients.map(({ id }) => {
      const client = new ClientEntity()
      client.id = id.toString()
      return client
    })

    return entity
  }
}
