import { IReportRepository, Report } from '@/modules/report/domain'
import { User } from '@/modules/auth/domain'
import { AuthService } from '@/modules/auth/infra'

import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class ListReports {
  constructor(
    @Inject('ReportRepository')
    private readonly reportRepository: IReportRepository,
    @Inject('AuthService')
    private readonly authService: AuthService,
  ) {}

  async execute({ user }: ListReports.Input): Promise<ListReports.Output> {
    try {
      const admin = this.authService.hasAdminRole(user)

      const reports = await this.reportRepository.findAll({
        client_id: admin ? undefined : user.sub,
      })

      return reports
    } catch {
      throw new Error('Could not list reports')
    }
  }
}

export namespace ListReports {
  export type Input = {
    user: User
  }
  export type Output = Report[]
}
