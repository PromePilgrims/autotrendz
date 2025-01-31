import { UniqueEntityID } from '@/modules/@shared/domain'
import {
  LanguageId,
  TermId,
  Translation,
  TranslationId,
} from '@/modules/language/domain/entity'
import { TranslationEntity } from '@/modules/language/infra/database/entity'

export class TranslationMapper {
  static toDomain(entity: TranslationEntity): Translation {
    const translation = Translation.create({
      id: TranslationId.create(new UniqueEntityID(entity.id)),
      term_id: TermId.create(new UniqueEntityID(entity.term_id)),
      language_id: LanguageId.create(new UniqueEntityID(entity.language_id)),
      translation: entity.translation,
      created_by: entity.created_by,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    })

    return translation
  }

  static toEntity(domainEntity: Translation): TranslationEntity {
    const translationEntity = new TranslationEntity()

    translationEntity.id = domainEntity.id.toString()
    translationEntity.term_id = domainEntity.termId.toString()
    translationEntity.language_id = domainEntity.languageId.toString()
    translationEntity.translation = domainEntity.translation
    translationEntity.created_by = domainEntity.createdBy
    translationEntity.created_at = domainEntity.createdAt
    translationEntity.updated_at = domainEntity.updatedAt

    return translationEntity
  }
}
