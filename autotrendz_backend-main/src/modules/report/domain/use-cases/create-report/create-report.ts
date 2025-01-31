import { UniqueEntityID } from '@/modules/@shared/domain'
import { ClientId } from '@/modules/client/domain'
import { IReportRepository, Report } from '@/modules/report/domain'

import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class CreateReport {
  constructor(
    @Inject('ReportRepository')
    private readonly reportRepository: IReportRepository,
  ) {}

  async execute({
    name,
    client_ids,
    workspace_id,
    report_id,
    created_by,
  }: CreateReport.Input): Promise<CreateReport.Output> {
    const exists = await this.reportRepository.findBy({
      workspaceId: workspace_id,
      reportId: report_id,
    })
    if (exists) {
      throw new Error('Report already exists')
    }

    const report = Report.create({
      clients: client_ids.map((clientId) => ({
        id: ClientId.create(new UniqueEntityID(clientId)),
      })),
      name,
      workspaceId: workspace_id,
      reportId: report_id,
      createdBy: created_by,
    })

    try {
      await this.reportRepository.save(report)

      return report
    } catch {
      throw new Error('Could not create report')
    }
  }
}

export namespace CreateReport {
  export type Input = {
    client_ids: string[]
    name: string
    workspace_id: string
    report_id: string
    created_by: string
  }

  export type Output = Report
}
