import { UniqueEntityID } from '@/modules/@shared/domain'
import { Term, TermId } from '@/modules/language/domain/entity'
import { TermEntity } from '@/modules/language/infra/database/entity'
import { TranslationMapper } from '@/modules/language/infra/translation.mapper'

export class TermMapper {
  static toDomain(entity: TermEntity): Term {
    const term = Term.create({
      id: TermId.create(new UniqueEntityID(entity.id)),
      translations: entity.translations.map((translation) =>
        TranslationMapper.toDomain(translation),
      ),
      section: entity.section,
      name: entity.name,
      code: entity.code,
      completed: entity.completed,
      created_by: entity.created_by,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    })

    return term
  }

  static toEntity(domainEntity: Term): TermEntity {
    const termEntity = new TermEntity()

    termEntity.id = domainEntity.id.toString()
    termEntity.translations = domainEntity.translations.map((translation) =>
      TranslationMapper.toEntity(translation),
    )
    termEntity.section = domainEntity.section
    termEntity.name = domainEntity.name
    termEntity.code = domainEntity.code
    termEntity.completed = domainEntity.completed
    termEntity.created_by = domainEntity.createdBy
    termEntity.created_at = domainEntity.createdAt
    termEntity.updated_at = domainEntity.updatedAt

    return termEntity
  }
}
