import { Term } from '@/modules/language/domain/entity'
import { TermRepository } from '@/modules/language/infra/database'

import { Inject } from '@nestjs/common'

export class ListTerm {
  constructor(
    @Inject('TermRepository')
    private readonly termRepository: TermRepository,
  ) {}

  async exec({ id }: ListTerm.Input): Promise<ListTerm.Output> {
    try {
      const term = await this.termRepository.findBy({ id })

      return term
    } catch {
      throw new Error('Could not list terms')
    }
  }
}

export namespace ListTerm {
  export type Input = {
    id: string
  }

  export type Output = Term
}
