import { IPowerBiRepository, IPowerBiService } from '@/modules/power-bi/domain'
import {
  ActivityHistory,
  PowerBiActivity,
} from '@/modules/power-bi/domain/entity'

import { Inject, Injectable, Logger } from '@nestjs/common'

@Injectable()
export class SuspendCapacity {
  private readonly logger = new Logger(SuspendCapacity.name)

  constructor(
    @Inject('PowerBiRepository')
    private readonly powerBiRepository: IPowerBiRepository,
    @Inject('PowerBiService') private readonly powerBiService: IPowerBiService,
  ) {}

  async exec(): Promise<void> {
    await this.powerBiService.suspendCapacity()
    this.logger.log('Capacity suspended')
    await this.powerBiRepository.registerActivity(
      ActivityHistory.create({ activity: PowerBiActivity.SUSPENDED }),
    )
  }
}
