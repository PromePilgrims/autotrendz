import { CheckCapacity } from '@/modules/power-bi/domain/use-cases'

import { Injectable, Logger } from '@nestjs/common'
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule'
import { CronJob } from 'cron'

@Injectable()
export class CheckCapacityCron {
  private readonly logger = new Logger(CheckCapacityCron.name)

  constructor(
    schedulerRegistry: SchedulerRegistry,
    checkCapacityUseCase: CheckCapacity,
  ) {
    const cronTime = CronExpression.EVERY_MINUTE

    const job = new CronJob(cronTime, async () => {
      await checkCapacityUseCase.exec()
    })

    schedulerRegistry.addCronJob('POWERBI_CAPACITY_CHECK', job)
    job.start()

    this.logger.log(`job started with cron time: ${cronTime}`)
  }
}
