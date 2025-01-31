import { IReportRepository, Report } from '@/modules/report/domain'

import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class DeleteReport {
  constructor(
    @Inject('ReportRepository')
    private readonly reportRepository: IReportRepository,
  ) {}

  async execute({ id }: DeleteReport.Input): Promise<DeleteReport.Output> {
    try {
      await this.reportRepository.delete({ id })

      return null
    } catch {
      throw new Error('Could not delete report')
    }
  }
}

export namespace DeleteReport {
  export type Input = { id: string }

  export type Output = Report
}
