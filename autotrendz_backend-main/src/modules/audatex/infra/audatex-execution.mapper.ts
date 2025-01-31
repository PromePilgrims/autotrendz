import { UniqueEntityID } from '@/modules/@shared/domain'
import {
  Execution,
  ExecutionId,
  ExecutionStatus,
} from '@/modules/audatex/domain/entity'
import { ExecutionEntity } from '@/modules/audatex/infra/database/entity'

export class AudatexExecutionMapper {
  static toDomain(entity: ExecutionEntity): Execution {
    return Execution.create({
      id: ExecutionId.create(new UniqueEntityID(entity.id)),
      status: entity.status as ExecutionStatus,
      source_file_name: entity.source_file_name,
      source_temp_file_data: entity.source_temp_file_data,
      output_file_url: entity.output_file_url,
      triggered_by: entity.triggered_by,
      triggered_at: entity.triggered_at,
      completed_at: entity.completed_at,
    })
  }

  static toPersistence(execution: Execution): ExecutionEntity {
    const entity = new ExecutionEntity()
    entity.id = execution.id.toString()
    entity.status = execution.status
    entity.source_file_name = execution.source_file_name
    entity.source_temp_file_data = execution.source_temp_file_data
    entity.output_file_url = execution.output_file_url
    entity.triggered_by = execution.triggered_by
    entity.triggered_at = execution.triggered_at
    entity.completed_at = execution.completed_at
    return entity
  }
}
