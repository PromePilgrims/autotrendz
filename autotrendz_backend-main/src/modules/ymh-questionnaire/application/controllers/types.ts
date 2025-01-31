import { Questionnaire } from '@/modules/ymh-questionnaire/domain'
import {
  Interviewee,
  QuestionnaireStatuses,
  Region,
} from '@/modules/ymh-questionnaire/domain/entity'
import { Transform } from 'class-transformer'

import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export class SaveQuestionnaireDTO {
  @IsString()
  @IsOptional()
  id?: string

  @IsString()
  @IsOptional()
  title?: string

  @IsEnum(QuestionnaireStatuses)
  status: QuestionnaireStatuses

  @IsString()
  interviewee_id: string

  @IsJSON()
  questionnaire: string

  @IsOptional()
  @IsDateString()
  recall_date?: Date
}

export class ListRandomIntervieweeDTO {
  @Transform(({ value }) => {
    if (value === 'true') return true
    if (value === 'false') return false
    return value
  })
  @IsBoolean()
  made_revision: boolean

  @IsString()
  @IsNotEmpty()
  region_id: string
}

export class QuestionnaireDTO {
  private constructor(
    private readonly id: string,
    private readonly title: string,
    private readonly status: QuestionnaireStatuses,
    private readonly interviewee: IntervieweeDTO,
    private readonly interviewer_id: string,
    private readonly questionnaire: string,
    private readonly recall_date: Date,
    private readonly created_at: Date,
    private readonly updated_at: Date,
  ) {}

  static fromDomain(questionnaire: Questionnaire) {
    let obj: any = {}

    try {
      obj = JSON.parse(questionnaire.questionnaire)
    } catch {}

    return new QuestionnaireDTO(
      questionnaire.id.toString(),
      questionnaire.title,
      questionnaire.status,
      questionnaire.interviewee
        ? IntervieweeDTO.fromDomain(questionnaire.interviewee)
        : null,
      questionnaire.interviewer_id.toString(),
      obj,
      questionnaire.recall_date,
      questionnaire.created_at,
      questionnaire.updated_at,
    )
  }
}

export class IntervieweeDTO {
  private constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly phone: string,
    private readonly made_revision: boolean,
    private readonly region: RegionDTO,
    private readonly created_at: Date,
  ) {}

  static fromDomain(interviewee: Interviewee) {
    return new IntervieweeDTO(
      interviewee.id.toString(),
      interviewee.name,
      interviewee.phone,
      interviewee.made_revision,
      RegionDTO.fromDomain(interviewee.region),
      interviewee.created_at,
    )
  }
}

export class RegionDTO {
  private constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly description: string,
    private readonly created_at: Date,
  ) {}

  static fromDomain(region: Region) {
    return new RegionDTO(
      region.id.toString(),
      region.name,
      region.description,
      region.created_at,
    )
  }
}

export class QuestWithIntervieweeDTO {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly phone: string,
    private readonly made_revision: boolean,
    private readonly region_id: string,
    private readonly created_at: Date,
    private readonly questionnaire: QuestionnaireDTO,
    private readonly region: RegionDTO,
    private readonly interviewer: any,
  ) {}

  static fromDomain(data: any) {
    return new QuestWithIntervieweeDTO(
      data.id.toString(),
      data.name,
      data.phone,
      data.made_revision,
      data.region_id.toString(),
      data.created_at,
      data.questionnaire
        ? QuestionnaireDTO.fromDomain(data.questionnaire)
        : null,
      RegionDTO.fromDomain(data.region),
      data.interviewer,
    )
  }
}

export class ExportQuestionnairesDTO {
  @Transform(({ value }) => {
    if (value === 'true') return true
    if (value === 'false') return false
    return value
  })
  @IsBoolean()
  made_revision: boolean
}
