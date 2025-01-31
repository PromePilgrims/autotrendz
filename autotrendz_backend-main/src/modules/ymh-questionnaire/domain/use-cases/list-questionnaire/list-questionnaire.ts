import { User } from '@/modules/auth/domain'
import { ClientRole } from '@/modules/client/domain/entity'
import {
  IYmhQuestionnaireRepository,
  Questionnaire,
} from '@/modules/ymh-questionnaire/domain'
import { QuestionnaireStatuses } from '@/modules/ymh-questionnaire/domain/entity'

import { ForbiddenException, Inject, Logger } from '@nestjs/common'

export class ListQuestionnaire {
  private readonly logger = new Logger()

  constructor(
    @Inject('YmhQuestionnaireRepository')
    private readonly questRepo: IYmhQuestionnaireRepository,
  ) {}

  async exec({
    id,
    user,
  }: ListQuestionnaire.Input): Promise<ListQuestionnaire.Output> {
    const quest = (await this.questRepo.find({ id }))[0]

    if (
      ![ClientRole.ADMIN, ClientRole.SUPERVISOR].includes(user.role) &&
      (quest.interviewer_id !== user.sub ||
        quest.status !== QuestionnaireStatuses.SAVED)
    ) {
      this.logger.error(
        `User "${user.name}" is not allowed to access this questionnaire`,
      )
      throw new ForbiddenException()
    }

    return quest
  }
}

export namespace ListQuestionnaire {
  export type Input = { id: string; user: User }
  export type Output = Questionnaire
}
