import { Term, TermId } from '@/modules/language/domain/entity'
import { TermRepository } from '@/modules/language/infra/database'

import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class CreateTerm {
  constructor(
    @Inject('TermRepository')
    private readonly termRepository: TermRepository,
  ) {}

  async exec(input: CreateTerm.Input): Promise<CreateTerm.Output> {
    try {
      const term = Term.create({ ...input, id: TermId.create() })

      await this.termRepository.save(term)

      return term
    } catch {
      throw new Error('Could not add term')
    }
  }
}

export namespace CreateTerm {
  export type Input = {
    name: string
    section: string
    code: string
    created_by: string
  }

  export type Output = Term
}
