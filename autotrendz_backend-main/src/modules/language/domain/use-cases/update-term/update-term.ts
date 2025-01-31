import { UniqueEntityID } from '@/modules/@shared/domain'
import {
  LanguageId,
  Term,
  Translation,
  TranslationId,
} from '@/modules/language/domain/entity'
import { TermRepository } from '@/modules/language/infra/database'

import { Inject } from '@nestjs/common'

export class UpdateTerm {
  constructor(
    @Inject('TermRepository')
    private readonly termRepository: TermRepository,
  ) {}

  async exec({
    id,
    translations,
    section,
    name,
    code,
    updated_by,
  }: UpdateTerm.Input): Promise<UpdateTerm.Output> {
    try {
      const term = await this.termRepository.findBy({ id })

      if (!term) {
        throw new Error('Term not found')
      }

      if (name) {
        term.changeName(name)
      }

      if (section) {
        term.changeSection(section)
      }

      if (code) {
        term.changeCode(code)
      }

      if (translations) {
        term.changeTranslations(
          translations.map(({ translation: text, id, language_id }) =>
            Translation.create({
              id: TranslationId.create(new UniqueEntityID(id)),
              term_id: term.id,
              language_id: LanguageId.create(new UniqueEntityID(language_id)),
              translation: text,
              created_by: updated_by,
            }),
          ),
        )
      }

      await this.termRepository.save(term)

      return term
    } catch {
      throw new Error('Could not update terms')
    }
  }
}

export namespace UpdateTerm {
  export type Input = {
    id: string
    translations?: { id?: string; translation: string; language_id: string }[]
    section?: string
    name?: string
    code?: string
    completed?: boolean
    updated_by: string
  }

  export type Output = Term
}
