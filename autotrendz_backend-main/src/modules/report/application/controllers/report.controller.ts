import {
  CreateReport,
  DeleteReport,
  ListReport,
  ListReports,
  UpdateReport,
} from '@/modules/report/domain/use-cases'
import { ClientRole } from '@/modules/client/domain/entity'
import {
  CreateReportDTO,
  ReportDTO,
  UpdateReportDTO,
} from '@/modules/report/application/controllers'
import { Roles } from '@/modules/auth/decorators'

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Request,
  Param,
  Post,
  Put,
} from '@nestjs/common'

@Controller('reports')
export class ReportController {
  constructor(
    private readonly createReport: CreateReport,
    private readonly listReport: ListReport,
    private readonly listReports: ListReports,
    private readonly updateReport: UpdateReport,
    private readonly deleteReport: DeleteReport,
  ) {}

  private readonly logger = new Logger(ReportController.name)

  @Roles([ClientRole.ADMIN])
  @Post()
  async create(
    @Request() { user }: any,
    @Body() { client_ids, name, report_id, workspace_id }: CreateReportDTO,
  ) {
    try {
      const report = await this.createReport.execute({
        client_ids,
        name,
        workspace_id,
        report_id,
        created_by: user.sub,
      })
      return ReportDTO.fromAggregate(report)
    } catch (error) {
      this.logger.error(error)
      throw new BadRequestException()
    }
  }

  @Get(':id')
  async list(@Request() { user }: any, @Param('id') id: string) {
    try {
      const report = await this.listReport.execute({ id, user })
      return ReportDTO.fromAggregate(report)
    } catch (error) {
      this.logger.error(error)
      throw new BadRequestException()
    }
  }

  @Get()
  async listAll(@Request() { user }: any) {
    try {
      const reports = await this.listReports.execute({ user })
      return reports.map((report) => ReportDTO.fromAggregate(report))
    } catch (error) {
      this.logger.error(error)
      throw new BadRequestException()
    }
  }

  @Roles([ClientRole.ADMIN])
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() { client_ids, name, report_id, workspace_id }: UpdateReportDTO,
  ) {
    try {
      const report = await this.updateReport.execute({
        id,
        client_ids,
        name,
        workspace_id,
        report_id,
      })
      return ReportDTO.fromAggregate(report)
    } catch (error) {
      throw new BadRequestException()
    }
  }

  @Roles([ClientRole.ADMIN])
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    try {
      await this.deleteReport.execute({ id })
    } catch (error) {
      this.logger.error(error)
      throw new BadRequestException()
    }
  }
}
