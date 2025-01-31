import { UniqueEntityID } from '@/modules/@shared/domain'
import { ClientMapper } from '@/modules/client/infra'
import { Questionnaire } from '@/modules/ymh-questionnaire/domain'
import {
  Interviewee,
  IntervieweeId,
  QuestionnaireId,
  QuestionnaireStatuses,
  Region,
  RegionId,
} from '@/modules/ymh-questionnaire/domain/entity'
import {
  YmhIntervieweeEntity,
  YmhQuestionnaireEntity,
  YmhRegionEntity,
} from '@/modules/ymh-questionnaire/infra/database/entity'

export class YmhQuestionnaireMapper {
  static toDomain(data: YmhQuestionnaireEntity): Questionnaire {
    return Questionnaire.create({
      id: QuestionnaireId.create(new UniqueEntityID(data.id)),
      title: data.title,
      status: data.status as QuestionnaireStatuses,
      interviewer: ClientMapper.toDomain(data.interviewer),
      interviewee: YmhIntervieweeMapper.toDomain(data.interviewee),
      interviewer_id: data.interviewer_id,
      questionnaire: data.questionnaire,
      recall_date: data.recall_date,
    })
  }

  static toPersistence(domain: Questionnaire): YmhQuestionnaireEntity {
    return Object.assign(new YmhQuestionnaireEntity(), {
      id: domain.id.toString(),
      title: domain.title,
      status: domain.status,
      interviewee_id: domain.interviewee_id,
      interviewer_id: domain.interviewer_id,
      questionnaire: domain.questionnaire,
      recall_date: domain.recall_date,
      created_at: domain.created_at,
      updated_at: domain.updated_at,
    })
  }
}

export class YmhIntervieweeMapper {
  static toDomain(entity: YmhIntervieweeEntity): Interviewee {
    return Interviewee.create({
      id: IntervieweeId.create(new UniqueEntityID(entity.id)),
      name: entity.name,
      phone: entity.phone,
      made_revision: entity.made_revision,
      region: YmhRegionMapper.toDomain(entity.region),
      created_at: entity.created_at,
    })
  }
}

export class YmhRegionMapper {
  static toPersistence(domain: Region): YmhRegionEntity {
    return Object.assign(new YmhRegionEntity(), {
      id: domain.id,
      name: domain.name,
      description: domain.description,
      created_at: domain.created_at,
    })
  }

  static toDomain(entity: YmhRegionEntity): Region {
    return Region.create({
      id: RegionId.create(new UniqueEntityID(entity.id.toString())),
      name: entity.name,
      description: entity.description,
      created_at: entity.created_at,
    })
  }
}
