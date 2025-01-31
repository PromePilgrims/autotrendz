import { User } from '@/modules/auth/domain'
import { IClientRepository } from '@/modules/client/domain'
import { ClientRole } from '@/modules/client/domain/entity'
import {
  IYmhQuestionnaireRepository,
  Questionnaire,
} from '@/modules/ymh-questionnaire/domain'
import {
  QuestionnaireId,
  QuestionnaireStatuses,
} from '@/modules/ymh-questionnaire/domain/entity'

import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class SaveQuestionnaire {
  constructor(
    @Inject('YmhQuestionnaireRepository')
    private readonly questRepo: IYmhQuestionnaireRepository,
    @Inject('ClientRepository')
    private readonly clientRepo: IClientRepository,
  ) {}

  async exec({
    title,
    status,
    interviewee_id,
    questionnaire,
    recall_date,
    user,
  }: SaveQuestionnaire.Input): Promise<SaveQuestionnaire.Output> {
    const interviewer_id = user.sub

    const interviewee = (
      await this.questRepo.findInterviewee({ id: interviewee_id })
    )[0]
    if (!interviewee) {
      throw new Error('Interviewee not found')
    }

    const isAdminOrSupervisor = [
      ClientRole.ADMIN,
      ClientRole.SUPERVISOR,
    ].includes(user.role)

    // is user is not admin or supervisor before update or create the questionnaire,
    // check if the interviewee is already being interviewed by someone else, if so, return an error message
    if (!isAdminOrSupervisor) {
      const questsByInterviewee = await this.questRepo.find({
        interviewee_id,
      })
      if (
        questsByInterviewee &&
        questsByInterviewee.some(
          (q) =>
            q.interviewer_id !== interviewer_id &&
            q.status != QuestionnaireStatuses.NOT_REACHABLE,
        )
      ) {
        throw new Error(
          'Interviewee is still being interviewed or was already interviewed by someone else',
        )
      }
    }

    // if the questionnaire already exists, update it.
    const existingQuests = await this.questRepo.find({ interviewee_id })
    if (existingQuests.length) {
      const existingQuest = existingQuests[0]
      existingQuest.setStatus(status)
      existingQuest.setQuestionnaire(questionnaire)
      existingQuest.setRecallDate(recall_date)
      await this.questRepo.save(existingQuest)
      return existingQuest
    }

    const interviewer = await this.clientRepo.findOneBy({ id: interviewer_id })

    const quest = Questionnaire.create({
      id: QuestionnaireId.create(),
      title,
      interviewer_id,
      interviewee,
      interviewer,
      status,
      recall_date,
      questionnaire,
    })

    await this.questRepo.save(quest)

    return quest
  }
}

export namespace SaveQuestionnaire {
  export type Input = {
    id?: string
    title?: string
    status: QuestionnaireStatuses
    interviewee_id: string
    questionnaire: string
    recall_date?: Date
    user: User
  }

  export type Output = Questionnaire
}
