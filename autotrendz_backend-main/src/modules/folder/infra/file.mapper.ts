import { File, FileId } from '@/modules/folder/domain/entity'
import { FileEntity } from '@/modules/folder/infra/database/entity'
import { UniqueEntityID } from '@/modules/@shared/domain'
import { URLValueObject } from '@/modules/@shared/domain/value-object'

export class FileMapper {
  static toDomain({
    id,
    parent_id,
    src,
    size,
    mimetype,
    name,
    created_by,
    created_at,
    updated_at,
  }: FileEntity): File {
    const file = File.create({
      id: FileId.create(new UniqueEntityID(id)),
      name,
      parent_id,
      created_by,
      created_at,
      updated_at,
      mimetype,
      size,
    })

    file.setSrc(URLValueObject.create(src))

    return file
  }

  static toEntity(domainEntity: File): FileEntity {
    const entity = new FileEntity()

    entity.id = domainEntity.id.toString()
    entity.parent_id = domainEntity.parentId.toString()
    entity.name = domainEntity.name
    entity.src = domainEntity.src
    entity.size = domainEntity.size
    entity.mimetype = domainEntity.mimetype
    entity.created_by = domainEntity.createdBy
    entity.created_at = domainEntity.createdAt
    entity.updated_at = domainEntity.updatedAt

    return entity
  }
}
