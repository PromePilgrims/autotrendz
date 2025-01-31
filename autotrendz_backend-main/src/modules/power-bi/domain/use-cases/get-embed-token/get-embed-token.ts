import { IPowerBiRepository, IPowerBiService } from '@/modules/power-bi/domain'
import {
  ActivityHistory,
  EmbedToken,
  PowerBiActivity,
} from '@/modules/power-bi/domain/entity'
import { ResumeCapacity } from '@/modules/power-bi/domain/use-cases'

import { Inject, Injectable, forwardRef } from '@nestjs/common'

@Injectable()
export class GetEmbedToken {
  constructor(
    @Inject('PowerBiRepository')
    private readonly powerBiRepository: IPowerBiRepository,
    @Inject('PowerBiService') private readonly powerBiService: IPowerBiService,
    @Inject(forwardRef(() => ResumeCapacity))
    private readonly resumeCapacityUseCase: ResumeCapacity,
  ) {}

  async exec(params: GetEmbedToken.Input): Promise<GetEmbedToken.Output> {
    const lastActivity = await this.powerBiRepository.findLastActivity()
    if (lastActivity?.activity == PowerBiActivity.SUSPENDED) {
      await this.resumeCapacityUseCase.exec()
    }

    const embedToken = await this.powerBiService.getEmbedToken(params)

    if (!embedToken) {
      throw new Error('Could not get the embed token')
    }

    await this.powerBiRepository.registerActivity(
      ActivityHistory.create({
        activity: PowerBiActivity.TOKEN_GENERATED,
        data: JSON.stringify(params),
      }),
    )

    return embedToken
  }
}

export namespace GetEmbedToken {
  export type Input = {
    workspaceId: string
    reportId: string
  }

  export type Output = EmbedToken
}
