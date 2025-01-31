import { Report } from '@/modules/report/domain'

export type ReportWhere = {
  id?: string
  workspaceId?: string
  reportId?: string
}

export type ReportOwnWhere = ReportWhere & {
  client_id?: string
}

export interface IReportRepository {
  save(report: Report): Promise<void>
  findBy(where: ReportWhere): Promise<Report>
  findOwnBy(where: ReportOwnWhere): Promise<Report>
  findAll(where?: ReportOwnWhere): Promise<Report[]>
  delete(where: ReportWhere): Promise<void>
}
