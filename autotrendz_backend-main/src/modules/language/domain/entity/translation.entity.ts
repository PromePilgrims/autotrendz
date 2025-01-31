import { TermId, TranslationId } from '@/modules/language/domain/entity'
import { LanguageId } from '@/modules/language/domain/entity'

export type TranslationProps = {
  id: TranslationId
  term_id: TermId
  translation: string
  language_id: LanguageId
  created_by: string
  created_at?: Date
  updated_at?: Date
}

export class Translation {
  private constructor(
    private readonly _id: TranslationId,
    private readonly _termId: TermId,
    private _translation: string,
    private readonly _languageId: LanguageId,
    private readonly _createdBy: string,
    private readonly _createdAt: Date,
    private _updatedAt: Date,
  ) {}

  get id(): TranslationId {
    return this._id
  }

  get termId(): TermId {
    return this._termId
  }

  get translation(): string {
    return this._translation
  }

  get languageId(): LanguageId {
    return this._languageId
  }

  get createdBy(): string {
    return this._createdBy
  }

  get createdAt(): Date {
    return this._createdAt
  }

  get updatedAt(): Date {
    return this._updatedAt
  }

  changeTranslation(translation: string): void {
    this._translation = translation
  }

  static create({
    id,
    term_id,
    language_id,
    translation,
    created_by,
    created_at,
    updated_at,
  }: TranslationProps): Translation {
    const now = new Date()

    const newTranslation = new Translation(
      id,
      term_id,
      translation,
      language_id,
      created_by,
      created_at ?? now,
      updated_at ?? now,
    )

    return new Proxy(newTranslation, {
      set: (target, prop, value) => {
        target[prop] = value
        target['_updatedAt'] = new Date()
        return true
      },
    })
  }
}
