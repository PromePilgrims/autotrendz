import {
  FindByLanguage,
  ITermRepository,
  Where,
} from '@/modules/language/domain'
import { Term } from '@/modules/language/domain/entity'
import { TermMapper } from '@/modules/language/infra'
import { TermEntity } from '@/modules/language/infra/database/entity'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

export class TermRepository implements ITermRepository {
  constructor(
    @InjectRepository(TermEntity)
    private termRepo: Repository<TermEntity>,
  ) {}

  async save(domainEntity: Term): Promise<void> {
    await this.termRepo.save(TermMapper.toEntity(domainEntity))
  }

  async findBy({ id }: Where): Promise<Term> {
    const term = await this.termRepo.findOne({
      where: {
        id,
      },
      relations: ['translations'],
    })

    return term ? TermMapper.toDomain(term) : null
  }

  async findAllByLanguage({ language_id }: FindByLanguage): Promise<Term[]> {
    const terms = await this.termRepo.find({
      select: {
        translations: {
          translation: true,
        },
      },
      where: {
        completed: true,
        translations: {
          language_id,
        },
      },
      relations: ['translations'],
    })
    return terms.map((term) => TermMapper.toDomain(term))
  }

  async findAll(): Promise<Term[]> {
    const terms = await this.termRepo.find({ relations: ['translations'] })
    return terms.map((term) => TermMapper.toDomain(term))
  }
}
