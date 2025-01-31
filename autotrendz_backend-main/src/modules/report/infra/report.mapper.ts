import { Report } from '@/modules/report/domain'
import { ReportId } from '@/modules/report/domain/entity'
import { ClientId } from '@/modules/client/domain'
import { UniqueEntityID } from '@/modules/@shared/domain'
import { ClientEntity } from '@/modules/client/infra/database/entities'
import { ReportEntity } from '@/modules/report/infra/database/entities'

export class ReportMapper {
  static toPersistence(report: Report): ReportEntity {
    const clients = report.clients.map((client) => {
      const clientEntity = new ClientEntity()
      clientEntity.id = client.id.toString()
      return clientEntity
    })

    const reportEntity = new ReportEntity()
    reportEntity.id = report.id.toString()
    reportEntity.clients = clients
    reportEntity.name = report.name
    reportEntity.workspaceId = report.workspaceId
    reportEntity.reportId = report.reportId
    reportEntity.createdBy = report.createdBy
    reportEntity.createdAt = report.createdAt
    reportEntity.updatedAt = report.updatedAt

    return reportEntity
  }

  static toDomain(entity: ReportEntity): Report {
    return Report.create({
      id: ReportId.create(new UniqueEntityID(entity.id)),
      clients: entity.clients.map((client) => ({
        id: ClientId.create(new UniqueEntityID(client.id)),
        name: client.name,
      })),
      name: entity.name,
      workspaceId: entity.workspaceId,
      reportId: entity.reportId,
      createdBy: entity.createdBy,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    })
  }
}
