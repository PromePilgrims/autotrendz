import { IPowerBiRepository } from '@/modules/power-bi/domain'
import {
  ActivityHistory,
  PowerBiActivity,
} from '@/modules/power-bi/domain/entity'

import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class RegisterActivity {
  constructor(
    @Inject('PowerBiRepository')
    private readonly powerBiRepository: IPowerBiRepository,
  ) {}

  async exec(params: RegisterActivity.Input): Promise<RegisterActivity.Output> {
    await this.powerBiRepository.registerActivity(
      ActivityHistory.create({
        activity: PowerBiActivity.REPORT_OPENED,
        data: params,
      }),
    )
  }
}

export namespace RegisterActivity {
  export type Input = {
    workspaceId: string
    reportId: string
    userId: string
  }

  export type Output = void
}
