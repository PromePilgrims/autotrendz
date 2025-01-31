import { Term } from '@/modules/language/domain/entity'
import { TermRepository } from '@/modules/language/infra/database'

import { Inject } from '@nestjs/common'

export class ListTerms {
  constructor(
    @Inject('TermRepository')
    private readonly termRepository: TermRepository,
  ) {}

  async exec(): Promise<ListTerms.Output> {
    try {
      const terms = await this.termRepository.findAll()

      return terms
    } catch {
      throw new Error('Could not list terms')
    }
  }
}

export namespace ListTerms {
  export type Output = Term[]
}
