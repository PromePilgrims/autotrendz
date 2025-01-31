import { ILanguageRepository, Language, Where } from '@/modules/language/domain'
import { LanguageMapper } from '@/modules/language/infra'
import { LanguageEntity } from '@/modules/language/infra/database/entity'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

export class LanguageRepository implements ILanguageRepository {
  constructor(
    @InjectRepository(LanguageEntity)
    private languageRepo: Repository<LanguageEntity>,
  ) {}

  async save(domainEntity: Language): Promise<void> {
    await this.languageRepo.save(LanguageMapper.toEntity(domainEntity))
  }

  async findBy(where: Where): Promise<Language> {
    const language = await this.languageRepo.findOne({ where })

    return language ? LanguageMapper.toDomain(language) : null
  }

  async findAll(): Promise<Language[]> {
    const languages = await this.languageRepo.find()
    return languages.map((language) => LanguageMapper.toDomain(language))
  }
}
