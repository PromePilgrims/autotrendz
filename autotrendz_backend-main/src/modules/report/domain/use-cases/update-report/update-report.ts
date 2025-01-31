import { IReportRepository, Report } from '@/modules/report/domain'
import { ClientId } from '@/modules/client/domain'
import { UniqueEntityID } from '@/modules/@shared/domain'

import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class UpdateReport {
  constructor(
    @Inject('ReportRepository')
    private readonly reportRepository: IReportRepository,
  ) {}

  async execute({
    id,
    name,
    client_ids,
    workspace_id,
    report_id,
  }: UpdateReport.Input): Promise<UpdateReport.Output> {
    const report = await this.reportRepository.findBy({ id })

    if (!report) {
      throw new Error('Report does not exist')
    }

    report.changeName(name)
    report.changeReport(report_id)
    report.changeWorkspace(workspace_id)

    if (client_ids && client_ids.length) {
      report.changeClients(
        client_ids.map((clientId) => ({
          id: ClientId.create(new UniqueEntityID(clientId)),
        })),
      )
    }

    try {
      await this.reportRepository.save(report)

      return await this.reportRepository.findBy({ id })
    } catch {
      throw new Error('Could not update report')
    }
  }
}

export namespace UpdateReport {
  export type Input = {
    id: string
    name: string
    client_ids: string[]
    workspace_id: string
    report_id: string
  }

  export type Output = Report
}
