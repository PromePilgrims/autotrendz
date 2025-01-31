import { Language } from '@/modules/language/domain/language'
import { LanguageId } from '@/modules/language/domain/entity'
import { LanguageRepository } from '@/modules/language/infra/database'

import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class CreateLanguage {
  constructor(
    @Inject('LanguageRepository')
    private readonly languageRepository: LanguageRepository,
  ) {}

  async exec(input: CreateLanguage.Input): Promise<CreateLanguage.Output> {
    try {
      const language = Language.create({ ...input, id: LanguageId.create() })

      await this.languageRepository.save(language)

      return language
    } catch {
      throw new Error('Could not add language')
    }
  }
}

export namespace CreateLanguage {
  export type Input = {
    name: string
    code: string
    created_by: string
  }

  export type Output = Language
}
