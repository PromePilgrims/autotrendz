import { Language } from '@/modules/language/domain/language'
import { LanguageRepository } from '@/modules/language/infra/database'

import { Inject } from '@nestjs/common'

export class ListLanguages {
  constructor(
    @Inject('LanguageRepository')
    private readonly languageRepository: LanguageRepository,
  ) {}

  async exec(): Promise<ListLanguages.Output> {
    try {
      const languages = await this.languageRepository.findAll()
      return languages
    } catch {
      throw new Error('Could not list languages')
    }
  }
}

export namespace ListLanguages {
  export type Output = Language[]
}
