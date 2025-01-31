import {
  IYmhQuestionnaireRepository,
  Summary,
} from '@/modules/ymh-questionnaire/domain'

import { Inject } from '@nestjs/common'

export class ListSummary {
  constructor(
    @Inject('YmhQuestionnaireRepository')
    private readonly questRepo: IYmhQuestionnaireRepository,
  ) {}

  async exec(): Promise<Summary> {
    return await this.questRepo.getSummary()
  }
}
