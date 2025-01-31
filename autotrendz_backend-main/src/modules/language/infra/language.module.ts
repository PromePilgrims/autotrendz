import { LanguageController } from '@/modules/language/application/controllers'
import {
  CreateLanguage,
  CreateTerm,
  ListLanguageTerms,
  ListLanguages,
  ListTerm,
  ListTerms,
  UpdateLanguage,
  UpdateTerm,
} from '@/modules/language/domain/use-cases'
import {
  LanguageEntity,
  TermEntity,
  TranslationEntity,
} from '@/modules/language/infra/database/entity'
import {
  LanguageRepository,
  TermRepository,
} from '@/modules/language/infra/database'

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([LanguageEntity, TermEntity, TranslationEntity]),
  ],
  controllers: [LanguageController],
  providers: [
    {
      provide: 'LanguageRepository',
      useClass: LanguageRepository,
    },
    {
      provide: 'TermRepository',
      useClass: TermRepository,
    },
    CreateLanguage,
    CreateTerm,
    ListTerms,
    ListTerm,
    UpdateTerm,
    ListLanguages,
    ListLanguageTerms,
    UpdateLanguage,
  ],
})
export class LanguageModule {}
