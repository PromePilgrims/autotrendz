import {
  IReportRepository,
  Report,
  ReportOwnWhere,
  ReportWhere,
} from '@/modules/report/domain'
import { ReportEntity } from '@/modules/report/infra/database/entities'
import { ReportMapper } from '@/modules/report/infra'

import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'

export class ReportRepository implements IReportRepository {
  constructor(
    @InjectRepository(ReportEntity)
    private reportRepo: Repository<ReportEntity>,
  ) {}

  async save(report: Report): Promise<void> {
    await this.reportRepo.save(ReportMapper.toPersistence(report))
  }

  async findBy(where: ReportWhere): Promise<Report> {
    const report = await this.reportRepo.findOne({
      select: {
        clients: {
          id: true,
          name: true,
        },
      },
      where,
      relations: ['clients'],
    })

    return report ? ReportMapper.toDomain(report) : null
  }

  async findOwnBy(where: ReportOwnWhere): Promise<Report> {
    const report = await this.reportRepo.findOne({
      select: {
        clients: {
          id: true,
          name: true,
        },
      },
      where: {
        id: where.id,
        clients: {
          id: In([where.client_id]),
        },
      },
      relations: ['clients'],
    })

    return report ? ReportMapper.toDomain(report) : null
  }

  async findAll({ client_id }: ReportOwnWhere): Promise<Report[]> {
    const reports = await this.reportRepo.find({
      select: {
        clients: {
          id: true,
          name: true,
        },
      },
      where: {
        clients: client_id ? { id: In([client_id]) } : undefined,
      },
      relations: {
        clients: true,
      },
    })
    return reports.map((report) => ReportMapper.toDomain(report))
  }

  async delete(where: ReportWhere): Promise<void> {
    await this.reportRepo.delete(where)
  }
}
