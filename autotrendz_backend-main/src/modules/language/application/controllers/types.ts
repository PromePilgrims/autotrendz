import { Language } from '@/modules/language/domain'
import { Term } from '@/modules/language/domain/entity'
import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'

export class CreateLanguageDTO {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  code: string
}

export class UpdateLanguageDTO {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  code?: string

  @IsOptional()
  @IsBoolean()
  active?: boolean
}

export class LanguageDTO {
  private constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly code: string,
    private readonly active: boolean,
    private readonly created_by: string,
    private readonly created_at: Date,
    private readonly updated_at: Date,
  ) {}

  static fromAggregate(aggregate: Language): LanguageDTO {
    return new LanguageDTO(
      aggregate.id.toString(),
      aggregate.name,
      aggregate.code,
      aggregate.isActive,
      aggregate.createdBy,
      aggregate.createdAt,
      aggregate.updatedAt,
    )
  }
}

export class CreateTermDTO {
  @IsString()
  name: string

  @IsString()
  section: string

  @IsString()
  code: string
}

export class TermTranslationDTO {
  @IsString()
  @IsOptional()
  id: string

  @IsString()
  translation: string

  @IsString()
  language_id: string
}

export class UpdateTermDTO {
  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  section: string

  @IsOptional()
  @IsString()
  code: string

  @IsOptional()
  @ValidateNested()
  @Type(() => TermTranslationDTO)
  translations?: TermTranslationDTO[]
}

export class TermDTO {
  private constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly section: string,
    private readonly code: string,
    private readonly completed: boolean,
    private readonly translations: {
      id: string
      translation: string
      language: string
    }[] = [],
    private readonly created_by: string,
    private readonly created_at: Date,
    private readonly updated_at: Date,
  ) {}

  static fromEntity(entity: Term): TermDTO {
    return new TermDTO(
      entity.id.toString(),
      entity.name,
      entity.section,
      entity.code,
      entity.completed,
      entity.translations.map((translation) => ({
        id: translation.id.toString(),
        translation: translation.translation,
        language: translation.languageId.toString(),
      })),
      entity.createdBy,
      entity.createdAt,
      entity.updatedAt,
    )
  }
}

export class TranslationTermDTO {
  private constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly section: string,
    private readonly key: string,
    private readonly value: string,
  ) {}

  static fromEntity(entity: Term): TranslationTermDTO {
    return new TranslationTermDTO(
      entity.id.toString(),
      entity.name,
      entity.section,
      entity.code,
      entity.translations[0].translation,
    )
  }
}
