import { IYmhQuestionnaireRepository } from '@/modules/ymh-questionnaire/domain'
import { QuestionnaireStatuses } from '@/modules/ymh-questionnaire/domain/entity'
import { IClientRepository } from '@/modules/client/domain'

import { Inject } from '@nestjs/common'

export class ListQuestionnairesWithInterviewees {
  constructor(
    @Inject('YmhQuestionnaireRepository')
    private readonly questRepo: IYmhQuestionnaireRepository,
    @Inject('ClientRepository')
    private readonly clientRepository: IClientRepository,
  ) {}

  async exec({
    region,
    status,
  }: ListQuestionnairesWithInterviewees.Input): Promise<ListQuestionnairesWithInterviewees.Output> {
    const domainStatus = QuestionnaireStatuses[status]
    if (status !== undefined && domainStatus == undefined) {
      throw new Error('Invalid status')
    }

    const interviewees =
      (await this.questRepo.findIntervieweesWithQuestionnaires({
        region,
        status: domainStatus,
      })) as any

    if (interviewees.length)
      for (const interviewee of interviewees) {
        if (!interviewee.questionnaire) continue
        const interviewer = await this.clientRepository.findOneBy(
          {
            id: interviewee.questionnaire.interviewer_id,
          },
          true,
        )
        interviewee.interviewer = {
          id: interviewer.id.toString(),
          name: interviewer.name.value,
          email: interviewer.email.value,
          image: interviewer.image.value,
        }
      }

    return interviewees
  }
}

export namespace ListQuestionnairesWithInterviewees {
  export type Input = {
    region: string
    status?: string
  }

  export type Output = any[]
}
