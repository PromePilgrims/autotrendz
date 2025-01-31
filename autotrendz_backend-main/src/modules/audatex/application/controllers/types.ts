import { Execution } from '@/modules/audatex/domain/entity'

export class ExecutionDTO {
  private constructor(
    private readonly id: string,
    private readonly status: string,
    private readonly source_file_name: string,
    private readonly output_file_url: string,
    private readonly triggered_by: string,
    private readonly triggered_at: Date,
    private readonly completed_at: Date,
  ) {}

  static fromAggregate(aggregate: Execution): ExecutionDTO {
    return new ExecutionDTO(
      aggregate.id.toString(),
      aggregate.status,
      aggregate.source_file_name,
      aggregate.output_file_url,
      aggregate.triggered_by,
      aggregate.triggered_at,
      aggregate.completed_at,
    )
  }
}
