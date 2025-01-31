import { Term } from '@/modules/language/domain/entity'
import { TermRepository } from '@/modules/language/infra/database'

import { Inject } from '@nestjs/common'

export class ListLanguageTerms {
  constructor(
    @Inject('TermRepository')
    private readonly termRepository: TermRepository,
  ) {}

  async exec({
    language_id,
  }: ListLanguageTerms.Input): Promise<ListLanguageTerms.Output> {
    try {
      const terms = await this.termRepository.findAllByLanguage({ language_id })

      return terms
    } catch {
      throw new Error('Could not list terms')
    }
  }
}

export namespace ListLanguageTerms {
  export type Input = {
    language_id: string
  }

  export type Output = Term[]
}
