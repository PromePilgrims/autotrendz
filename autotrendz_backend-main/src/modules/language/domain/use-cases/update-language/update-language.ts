import { Language } from '@/modules/language/domain'
import { LanguageRepository } from '@/modules/language/infra/database'

import { Inject } from '@nestjs/common'

export class UpdateLanguage {
  constructor(
    @Inject('LanguageRepository')
    private readonly languageRepository: LanguageRepository,
  ) {}

  async exec({
    id,
    name,
    code,
    active,
  }: UpdateLanguage.Input): Promise<UpdateLanguage.Output> {
    try {
      const language = await this.languageRepository.findBy({ id })

      if (!language) {
        throw new Error('Language not found')
      }

      if (name) {
        language.changeName(name)
      }

      if (code) {
        language.changeCode(code)
      }

      if (active !== undefined) {
        active ? language.activate() : language.deactivate()
      }

      await this.languageRepository.save(language)

      return language
    } catch {
      throw new Error('Could not update language')
    }
  }
}

export namespace UpdateLanguage {
  export type Input = {
    id: string
    name?: string
    code?: string
    active?: boolean
  }

  export type Output = Language
}
