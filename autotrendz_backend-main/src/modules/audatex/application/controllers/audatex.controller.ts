import { makeFileMimetypeValidators } from '@/modules/@shared/application/factories'
import { ExecutionDTO } from '@/modules/audatex/application/controllers'
import {
  ListExecutions,
  StartScrapExecution,
} from '@/modules/audatex/domain/use-cases'
import { Roles } from '@/modules/auth/decorators'
import { ClientRole } from '@/modules/client/domain/entity'

import {
  BadRequestException,
  Controller,
  Logger,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
  Request,
  Get,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('audatex')
export class AudatexController {
  private readonly logger = new Logger(AudatexController.name)

  constructor(
    private readonly startScrapExecutionUseCase: StartScrapExecution,
    private readonly listExecutionsUseCase: ListExecutions,
  ) {}

  @Roles([ClientRole.ADMIN])
  @Get()
  async listExecutionsHandler() {
    try {
      const executions = await this.listExecutionsUseCase.exec()
      return executions.map(ExecutionDTO.fromAggregate)
    } catch (error) {
      this.logger.error(error)
      throw new BadRequestException()
    }
  }

  @Roles([ClientRole.ADMIN])
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async executeScrapHandler(
    @Request() { user }: any,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
        validators: makeFileMimetypeValidators(['xlsx', 'csv']),
      }),
    )
    excelFile: any,
  ) {
    try {
      return this.startScrapExecutionUseCase.exec({
        triggered_by: user.sub,
        ...excelFile,
      })
    } catch (error) {
      this.logger.error(error)
      throw new BadRequestException()
    }
  }
}
