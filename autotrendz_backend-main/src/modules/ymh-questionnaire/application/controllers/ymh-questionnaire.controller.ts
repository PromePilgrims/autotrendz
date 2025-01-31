import { ClientRole } from '@/modules/client/domain/entity'
import {
  ExportQuestionnaires,
  ListInterviewee,
  ListQuestionnaire,
  ListQuestionnaires,
  ListQuestionnairesWithInterviewees,
  ListRegions,
  ListSummary,
  SaveQuestionnaire,
} from '@/modules/ymh-questionnaire/domain/use-cases'
import {
  ExportQuestionnairesDTO,
  IntervieweeDTO,
  ListRandomIntervieweeDTO,
  QuestionnaireDTO,
  QuestWithIntervieweeDTO,
  RegionDTO,
  SaveQuestionnaireDTO,
} from '@/modules/ymh-questionnaire/application/controllers'
import { Roles } from '@/modules/auth/decorators'

import {
  Body,
  Request,
  Controller,
  Logger,
  Post,
  ForbiddenException,
  Get,
  Param,
  NotFoundException,
  Query,
  BadRequestException,
} from '@nestjs/common'

@Controller('ymh-questionnaires')
export class YmhQuestionnaireController {
  private readonly logger = new Logger(YmhQuestionnaireController.name)

  constructor(
    private readonly saveQuestionnaire: SaveQuestionnaire,
    private readonly listQuestionnaires: ListQuestionnaires,
    private readonly listQuestionnairesWithInterviewees: ListQuestionnairesWithInterviewees,
    private readonly listQuestionnaire: ListQuestionnaire,
    private readonly listInterviewee: ListInterviewee,
    private readonly listRegions: ListRegions,
    private readonly listSummary: ListSummary,
    private readonly exportQuestionnaires: ExportQuestionnaires,
  ) {}

  @Roles([ClientRole.ADMIN, ClientRole.INTERVIEWER])
  @Get('available-interviewee')
  async listIntervieweeHandler(@Query() params: ListRandomIntervieweeDTO) {
    const interviewee = await this.listInterviewee.exec(params)

    if (!interviewee) {
      throw new NotFoundException('Could not find any person to be interviewed')
    }

    return IntervieweeDTO.fromDomain(interviewee)
  }

  @Get('list-with-interviewees')
  @Roles([ClientRole.ADMIN, ClientRole.SUPERVISOR])
  async listQuestIntervieweesHandler(@Query() query: any) {
    try {
      const { region, status } = query

      if (!region) {
        throw new BadRequestException('Region is required')
      }

      const questsWithInterviewees =
        await this.listQuestionnairesWithInterviewees.exec({
          region,
          status,
        })

      if (!questsWithInterviewees.length) {
        throw new NotFoundException(
          'Could not list questionnaires with interviewees',
        )
      }

      return questsWithInterviewees.map(QuestWithIntervieweeDTO.fromDomain)
    } catch (error) {
      this.logger.error(error.message)
      if (!(error instanceof NotFoundException)) throw new BadRequestException()
    }
  }

  @Get()
  @Roles([ClientRole.ADMIN, ClientRole.SUPERVISOR, ClientRole.INTERVIEWER])
  async listQuestionnairesHandler(
    @Request() { user }: any,
    @Query('region_id') region_id?: string,
  ) {
    const quests = await this.listQuestionnaires.exec({
      region_id,
      user,
    })
    return quests.map((quest) => QuestionnaireDTO.fromDomain(quest))
  }

  @Get('regions')
  @Roles([ClientRole.ADMIN, ClientRole.SUPERVISOR, ClientRole.INTERVIEWER])
  async listRegionsHandler() {
    const regions = await this.listRegions.exec()
    return regions.map((region) => RegionDTO.fromDomain(region))
  }

  @Get('summary')
  @Roles([ClientRole.ADMIN, ClientRole.SUPERVISOR])
  async listQuestionnairesSummaryHandler() {
    const summary = await this.listSummary.exec()
    return {
      data: summary,
    }
  }

  @Get('export-questionnaires')
  @Roles([ClientRole.ADMIN, ClientRole.SUPERVISOR])
  async exportQuestionnairesHandler(
    @Query() { made_revision }: ExportQuestionnairesDTO,
  ) {
    try {
      return await this.exportQuestionnaires.execute({
        made_revision,
      })
    } catch (error) {
      this.logger.error(error.message)
      throw new BadRequestException(error.message)
    }
  }

  @Get(':id')
  @Roles([ClientRole.ADMIN, ClientRole.SUPERVISOR, ClientRole.INTERVIEWER])
  async listQuestionnaireHandler(
    @Request() { user }: any,
    @Param('id') id: string,
  ) {
    const quest = await this.listQuestionnaire.exec({ id, user })

    if (!quest) {
      throw new NotFoundException('Could not find questionnaire')
    }

    return QuestionnaireDTO.fromDomain(quest)
  }

  @Post()
  @Roles([ClientRole.ADMIN, ClientRole.SUPERVISOR, ClientRole.INTERVIEWER])
  async saveQuestionnaireHandler(
    @Request() { user }: any,
    @Body() saveQuestionnaireDTO: SaveQuestionnaireDTO,
  ) {
    try {
      const quest = await this.saveQuestionnaire.exec({
        ...saveQuestionnaireDTO,
        user,
      })
      return QuestionnaireDTO.fromDomain(quest)
    } catch (error) {
      this.logger.error(error.message)
      throw new ForbiddenException(error.message)
    }
  }
}
