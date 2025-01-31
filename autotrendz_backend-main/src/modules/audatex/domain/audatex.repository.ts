import { Execution } from '@/modules/audatex/domain/entity'

export interface IAudatexExecutionRepository {
  save(execution: Execution): Promise<void>
  findOneBy(where: IAudatexExecutionRepository.Where): Promise<Execution>
  findAll(): Promise<Execution[]>
}

export namespace IAudatexExecutionRepository {
  export type Where = {
    id?: string
  }
}
