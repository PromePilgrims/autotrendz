import { IReportRepository, Report } from '@/modules/report/domain'
import { User } from '@/modules/auth/domain'
import { AuthService } from '@/modules/auth/infra'

import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class ListReport {
  constructor(
    @Inject('ReportRepository')
    private readonly reportRepository: IReportRepository,
    @Inject('AuthService')
    private readonly authService: AuthService,
  ) {}

  async execute({ id, user }: ListReport.Input): Promise<ListReport.Output> {
    const admin = this.authService.hasAdminRole(user)

    const report = admin
      ? await this.reportRepository.findBy({ id })
      : await this.reportRepository.findOwnBy({ id, client_id: user.sub })

    if (!report) {
      throw new Error('Report not found')
    }

    return report
  }
}

export namespace ListReport {
  export type Input = {
    id: string
    user: User
  }

  export type Output = Report
}
