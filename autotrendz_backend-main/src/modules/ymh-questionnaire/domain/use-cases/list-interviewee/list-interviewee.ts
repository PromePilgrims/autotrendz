import { IYmhQuestionnaireRepository } from '@/modules/ymh-questionnaire/domain'
import { Interviewee } from '@/modules/ymh-questionnaire/domain/entity'

import { Inject } from '@nestjs/common'

export class ListInterviewee {
  constructor(
    @Inject('YmhQuestionnaireRepository')
    private readonly questRepo: IYmhQuestionnaireRepository,
  ) {}

  async exec(params?: ListInterviewee.Input): Promise<ListInterviewee.Output> {
    const randomInterviewee =
      await this.questRepo.findRandomAvailableInterviewee(params)

    return randomInterviewee
  }
}

export namespace ListInterviewee {
  export type Input = { made_revision: boolean; region_id: string }

  export type Output = Interviewee
}
