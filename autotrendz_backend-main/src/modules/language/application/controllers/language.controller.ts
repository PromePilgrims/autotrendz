import {
  CreateLanguage,
  CreateTerm,
  ListTerm,
  ListTerms,
  UpdateTerm,
  ListLanguageTerms,
  ListLanguages,
  UpdateLanguage,
} from '@/modules/language/domain/use-cases'
import { ClientRole } from '@/modules/client/domain/entity'
import {
  CreateLanguageDTO,
  CreateTermDTO,
  LanguageDTO,
  TermDTO,
  TranslationTermDTO,
  UpdateLanguageDTO,
  UpdateTermDTO,
} from '@/modules/language/application/controllers'
import { Roles } from '@/modules/auth/decorators'

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common'

@Controller('i18n')
export class LanguageController {
  constructor(
    private readonly createLanguage: CreateLanguage,
    private readonly createTerm: CreateTerm,
    private readonly listTerms: ListTerms,
    private readonly listTerm: ListTerm,
    private readonly updateTerm: UpdateTerm,
    private readonly listLanguages: ListLanguages,
    private readonly listLanguageTerms: ListLanguageTerms,
    private readonly updateLanguage: UpdateLanguage,
  ) {}

  @Roles([ClientRole.ADMIN])
  @Post('languages')
  async createLanguageHandler(
    @Request() { user }: any,
    @Body() input: CreateLanguageDTO,
  ) {
    const language = await this.createLanguage.exec({
      ...input,
      created_by: user.sub,
    })
    return LanguageDTO.fromAggregate(language)
  }

  @Roles([ClientRole.ADMIN])
  @Get('languages')
  async listLanguagesHandler() {
    const languages = await this.listLanguages.exec()
    return languages.map((language) => LanguageDTO.fromAggregate(language))
  }

  @Roles([ClientRole.ADMIN])
  @Put('languages/:id')
  async updateLanguageHandler(
    @Param('id') id: string,
    @Body() input: UpdateLanguageDTO,
  ) {
    const language = await this.updateLanguage.exec({ ...input, id })
    return LanguageDTO.fromAggregate(language)
  }

  @Get('languages/:language_id/term')
  async listLanguageTermsHandler(@Param('language_id') language_id: string) {
    const terms = await this.listLanguageTerms.exec({ language_id })
    return terms.map((term) => TranslationTermDTO.fromEntity(term))
  }

  @Roles([ClientRole.ADMIN])
  @Post('terms')
  async createTermHandler(
    @Request() { user }: any,
    @Body() input: CreateTermDTO,
  ) {
    const term = await this.createTerm.exec({ ...input, created_by: user.sub })
    return TermDTO.fromEntity(term)
  }

  @Roles([ClientRole.ADMIN])
  @Get('terms')
  async listTermsHandler() {
    const terms = await this.listTerms.exec()
    return terms.map((term) => TermDTO.fromEntity(term))
  }

  @Roles([ClientRole.ADMIN])
  @Get('terms/:id')
  async listTermHandler(@Param('id') id: string) {
    const term = await this.listTerm.exec({ id })
    return TermDTO.fromEntity(term)
  }

  @Roles([ClientRole.ADMIN])
  @Put('terms/:id')
  async updateTermHandler(
    @Param('id') id: string,
    @Request() { user }: any,
    @Body() input: UpdateTermDTO,
  ) {
    const term = await this.updateTerm.exec({
      ...input,
      id,
      updated_by: user.sub,
    })
    return TermDTO.fromEntity(term)
  }
}
