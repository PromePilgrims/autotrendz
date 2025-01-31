import { IPowerBiRepository, IPowerBiService } from '@/modules/power-bi/domain'
import {
  ActivityHistory,
  PowerBiActivity,
} from '@/modules/power-bi/domain/entity'

import { Inject, Injectable, Logger } from '@nestjs/common'

@Injectable()
export class ResumeCapacity {
  private readonly logger = new Logger(ResumeCapacity.name)

  constructor(
    @Inject('PowerBiRepository')
    private readonly powerBiRepository: IPowerBiRepository,
    @Inject('PowerBiService') private readonly powerBiService: IPowerBiService,
  ) {}

  async exec(): Promise<void> {
    const maxAttempts = 5

    let attempts = 0

    while (attempts < maxAttempts) {
      if (await this.powerBiService.resumeCapacity()) {
        break
      }

      attempts++
      this.logger.error(
        `Error trying to resume capacity. Attempt ${attempts}/${maxAttempts}`,
      )
    }

    await this.powerBiRepository.registerActivity(
      ActivityHistory.create({ activity: PowerBiActivity.RESUMED }),
    )
  }
}
