import { ExecutionId, ExecutionStatus } from '@/modules/audatex/domain/entity'

export type ExecutionProps = {
  id: ExecutionId
  status?: ExecutionStatus
  source_file_name: string
  source_temp_file_data: any
  output_file_url?: string
  triggered_by: string
  triggered_at?: Date
  completed_at?: Date
}

export class Execution {
  private _output_file_url?: string

  private constructor(
    private readonly _id: ExecutionId,
    private _status: ExecutionStatus = ExecutionStatus.RUNNING,
    private readonly _source_file_name: string,
    private readonly _source_temp_file_data: any,
    private readonly _triggered_by: string,
    private readonly _triggered_at: Date,
    private _completed_at?: Date,
  ) {}

  get id(): ExecutionId {
    return this._id
  }

  get status(): 'running' | 'completed' {
    return this._status
  }

  get source_file_name(): string {
    return this._source_file_name
  }

  get source_temp_file_data(): any {
    return this._source_temp_file_data
  }

  get output_file_url(): string | undefined {
    return this._output_file_url
  }

  get triggered_by(): string {
    return this._triggered_by
  }

  get triggered_at(): Date {
    return this._triggered_at
  }

  get completed_at(): Date {
    return this._completed_at
  }

  setOutputFileUrl(output_file_url: string): void {
    this._output_file_url = output_file_url
  }

  complete(): void {
    this._status = ExecutionStatus.COMPLETED
    this._completed_at = new Date()
  }

  static create({
    id,
    status,
    source_file_name,
    source_temp_file_data,
    output_file_url,
    triggered_by,
    triggered_at,
    completed_at,
  }: ExecutionProps): Execution {
    const execution = new Execution(
      id,
      status,
      source_file_name,
      source_temp_file_data,
      triggered_by,
      triggered_at ?? new Date(),
      completed_at,
    )
    if (output_file_url) execution.setOutputFileUrl(output_file_url)
    return execution
  }
}
