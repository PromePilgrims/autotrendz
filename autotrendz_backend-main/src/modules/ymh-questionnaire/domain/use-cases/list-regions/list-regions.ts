import { IYmhQuestionnaireRepository } from '@/modules/ymh-questionnaire/domain'
import { Region } from '@/modules/ymh-questionnaire/domain/entity'

import { Inject } from '@nestjs/common'

export class ListRegions {
  constructor(
    @Inject('YmhQuestionnaireRepository')
    private readonly questRepo: IYmhQuestionnaireRepository,
  ) {}

  async exec(): Promise<Region[]> {
    return this.questRepo.findRegions()
  }
}
