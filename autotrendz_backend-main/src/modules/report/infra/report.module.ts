import {
  CreateReport,
  DeleteReport,
  UpdateReport,
  ListReport,
  ListReports,
} from '@/modules/report/domain/use-cases'
import { ReportEntity } from '@/modules/report/infra/database/entities'
import { ReportRepository } from '@/modules/report/infra/database'
import { ReportController } from '@/modules/report/application/controllers'

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([ReportEntity])],
  controllers: [ReportController],
  providers: [
    {
      provide: 'ReportRepository',
      useClass: ReportRepository,
    },
    CreateReport,
    UpdateReport,
    ListReport,
    ListReports,
    DeleteReport,
  ],
})
export class ReportModule {}
