import { IAudatexExecutionRepository } from '@/modules/audatex/domain'
import { Execution } from '@/modules/audatex/domain/entity'
import { AudatexExecutionMapper } from '@/modules/audatex/infra/audatex-execution.mapper'
import { ExecutionEntity } from '@/modules/audatex/infra/database/entity'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

export class AudatexExecutionRepository implements IAudatexExecutionRepository {
  constructor(
    @InjectRepository(ExecutionEntity)
    private audatexExecutionRepository: Repository<ExecutionEntity>,
  ) {}

  async save(execution: Execution): Promise<void> {
    await this.audatexExecutionRepository.save(
      AudatexExecutionMapper.toPersistence(execution),
    )
  }

  async findOneBy(
    where: IAudatexExecutionRepository.Where,
  ): Promise<Execution> {
    const execution = await this.audatexExecutionRepository.findOne({ where })
    return execution ? AudatexExecutionMapper.toDomain(execution) : null
  }

  async findAll(): Promise<Execution[]> {
    const executions = await this.audatexExecutionRepository.find({
      take: 100,
      order: { triggered_at: 'DESC' },
    })
    return executions.map(AudatexExecutionMapper.toDomain)
  }
}
