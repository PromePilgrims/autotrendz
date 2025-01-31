import { User } from '@/modules/auth/domain'
import { ClientRole } from '@/modules/client/domain/entity'
import {
  IYmhQuestionnaireRepository,
  Questionnaire,
} from '@/modules/ymh-questionnaire/domain'
import { QuestionnaireStatuses } from '@/modules/ymh-questionnaire/domain/entity'

import { Inject } from '@nestjs/common'

export class ListQuestionnaires {
  constructor(
    @Inject('YmhQuestionnaireRepository')
    private readonly questRepo: IYmhQuestionnaireRepository,
  ) {}

  async exec({
    region_id,
    user,
  }: ListQuestionnaires.Input): Promise<ListQuestionnaires.Output> {
    const adminOrSupervisor = [
      ClientRole.ADMIN,
      ClientRole.SUPERVISOR,
    ].includes(user.role)

    return await this.questRepo.find({
      interviewer_id: !adminOrSupervisor ? user.sub : null,
      interviewee: region_id ? { region_id } : null,
      status: !adminOrSupervisor ? QuestionnaireStatuses.SAVED : null,
    })
  }
}

export namespace ListQuestionnaires {
  export type Input = {
    region_id?: string
    interviewee_id?: string
    interviewer_id?: string
    user: User
  }
  export type Output = Questionnaire[]
}
