import { UniqueEntityID } from '@/modules/@shared/domain'
import { LanguageId } from '@/modules/language/domain/entity'
import { Language } from '@/modules/language/domain/language'
import { LanguageEntity } from '@/modules/language/infra/database/entity'

export class LanguageMapper {
  static toDomain(entity: LanguageEntity): Language {
    const language = Language.create({
      id: LanguageId.create(new UniqueEntityID(entity.id)),
      name: entity.name,
      code: entity.code,
      created_by: entity.created_by,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    })

    if (!entity.active) {
      language.deactivate()
    }

    return language
  }

  static toEntity(domainEntity: Language): any {
    const languageEntity = new LanguageEntity()

    languageEntity.id = domainEntity.id.toString()
    languageEntity.name = domainEntity.name
    languageEntity.code = domainEntity.code
    languageEntity.active = domainEntity.isActive
    languageEntity.created_by = domainEntity.createdBy
    languageEntity.created_at = domainEntity.createdAt
    languageEntity.updated_at = domainEntity.updatedAt

    return languageEntity
  }
}
