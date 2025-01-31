import { IPowerBiRepository } from '@/modules/power-bi/domain'
import { SuspendCapacity } from '@/modules/power-bi/domain/use-cases'
import { PowerBiActivity } from '@/modules/power-bi/domain/entity'
import { dateDiffInMinutes } from '@/utils'

import { Inject, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class CheckCapacity {
  private capacityMaxMinutesOn: number

  constructor(
    @Inject('PowerBiRepository')
    private readonly powerBiRepository: IPowerBiRepository,
    private readonly suspendCapacityUseCase: SuspendCapacity,
    private readonly configService: ConfigService,
  ) {
    this.capacityMaxMinutesOn = this.configService.get<number>(
      'MAX_CAPACITY_MINUTES_ON',
    )
  }

  private readonly logger = new Logger(CheckCapacity.name)

  async exec(): Promise<void> {
    const lastActivity = await this.powerBiRepository.findLastActivity()
    const activity = PowerBiActivity.REPORT_OPENED

    if (lastActivity.activity != activity) {
      if (
        lastActivity.activity == PowerBiActivity.TOKEN_GENERATED &&
        dateDiffInMinutes(lastActivity.occurredAt) >= this.capacityMaxMinutesOn
      ) {
        this.suspend(lastActivity.activity)
        return
      }
      return
    }

    const lastReportOpenedActivity =
      await this.powerBiRepository.findLastActivityBy({
        activity,
      })

    if (!lastReportOpenedActivity) return

    if (
      dateDiffInMinutes(lastReportOpenedActivity.occurredAt) >=
      this.capacityMaxMinutesOn
    ) {
      this.suspend(activity)
    }
  }

  async suspend(activity: PowerBiActivity): Promise<void> {
    this.logger.log(
      `last activity "${activity}" on capacity "${this.configService.get(
        'POWERBI_CAPACITY_NAME',
      )}" was more than ${
        this.capacityMaxMinutesOn
      } minutes ago, suspending now.`,
    )
    await this.suspendCapacityUseCase.exec()
  }
}
