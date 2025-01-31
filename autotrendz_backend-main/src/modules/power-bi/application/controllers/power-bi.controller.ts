import {
  CapacityReady,
  GetEmbedToken,
  RegisterActivity,
} from '@/modules/power-bi/domain/use-cases'
import {
  GetEmbedTokenDTO,
  RegisterActivityDTO,
} from '@/modules/power-bi/application/controllers'
import { Public } from '@/modules/auth/application/decorators'

import {
  Body,
  Controller,
  Post,
  BadRequestException,
  HttpCode,
  Logger,
  HttpStatus,
  Get,
} from '@nestjs/common'

@Controller('power-bi')
@Public()
export class PowerBiController {
  private readonly logger = new Logger(PowerBiController.name)

  constructor(
    private readonly getEmbedTokenUseCase: GetEmbedToken,
    private readonly registerActivity: RegisterActivity,
    private readonly capacityReady: CapacityReady,
  ) {}

  @Post('embed-token')
  async getEmbedTokenHandler(
    @Body() { workspaceId, reportId }: GetEmbedTokenDTO,
  ) {
    try {
      const result = await this.getEmbedTokenUseCase.exec({
        workspaceId,
        reportId,
      })

      return result
    } catch (error) {
      this.logger.error(error)
      throw new BadRequestException(error.message)
    }
  }

  @Post('register-activity')
  @HttpCode(HttpStatus.OK)
  async registerActivityHandler(@Body() params: RegisterActivityDTO) {
    try {
      await this.registerActivity.exec(params)
    } catch (error) {
      this.logger.error(error)
      throw new BadRequestException(error.message)
    }
  }

  @Get('is-ready')
  async isReadyHandler() {
    try {
      return await this.capacityReady.exec()
    } catch (error) {
      this.logger.error(error)
      throw new BadRequestException(error.message)
    }
  }
}
