import { IAudatexExecutionRepository } from '@/modules/audatex/domain'
import { Execution } from '@/modules/audatex/domain/entity'
import { Inject } from '@nestjs/common'

export class ListExecutions {
  constructor(
    @Inject('AudatexExecutionRepository')
    private readonly executionRepository: IAudatexExecutionRepository,
  ) {}

  async exec(): Promise<ListExecutions.Output> {
    return this.executionRepository.findAll()
  }
}

export namespace ListExecutions {
  export type Output = Execution[]
}
