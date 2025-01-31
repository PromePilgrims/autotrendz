import { Report } from '@/modules/report/domain'

import { IsArray, IsOptional, IsString, IsUUID, Length } from 'class-validator'

export class CreateReportDTO {
  @IsArray()
  @IsString({ each: true })
  client_ids: string[]

  @IsString()
  @Length(3, 255)
  name: string

  @IsUUID()
  workspace_id: string

  @IsUUID()
  report_id: string
}

export class UpdateReportDTO extends CreateReportDTO {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  client_ids: string[]

  @IsString()
  @Length(3, 255)
  name: string

  @IsUUID()
  workspace_id: string

  @IsUUID()
  report_id: string
}

export class ReportDTO {
  private constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly clients: { id: string; name: string }[],
    private readonly workspace_id: string,
    private readonly report_id: string,
    private readonly created_by: string,
    private readonly created_at: Date,
    private readonly updated_at: Date,
  ) {}

  static fromAggregate(aggregate: Report): ReportDTO {
    const reportDTO = new ReportDTO(
      aggregate.id.toString(),
      aggregate.name,
      aggregate.clients.map((client) => ({
        id: client.id.toString(),
        name: client.name,
      })),
      aggregate.workspaceId.toString(),
      aggregate.reportId.toString(),
      aggregate.createdBy,
      aggregate.createdAt,
      aggregate.updatedAt,
    )

    return reportDTO
  }
}
