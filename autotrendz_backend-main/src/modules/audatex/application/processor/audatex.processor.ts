import { ExecuteScrap } from '@/modules/audatex/domain/use-cases'
import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq'
import { Logger } from '@nestjs/common'
import { Job } from 'bullmq'

@Processor('audatex')
export class AudatexProcessor extends WorkerHost {
  private readonly logger = new Logger(AudatexProcessor.name)

  constructor(private readonly executeScrapUseCase: ExecuteScrap) {
    super()
  }

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`Running [Audatex ${job.name}] job...`)
    await this.executeScrapUseCase.exec({
      execution_id: job.data.execution_id,
    })
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job) {
    const { id, name, queueName, failedReason } = job
    this.logger.error(
      `Job id: ${id}, name: ${name} failed in queue ${queueName}. Failed reason: ${failedReason}`,
    )
  }
}
