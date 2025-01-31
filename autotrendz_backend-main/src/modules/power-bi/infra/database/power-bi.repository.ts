import { IPowerBiRepository } from '@/modules/power-bi/domain'
import { ActivityHistory as ActivityHistoryModel } from '@/modules/power-bi/infra/database/entities'
import { PowerBiMapper } from '@/modules/power-bi/infra'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ActivityHistory } from '@/modules/power-bi/domain/entity'

export class PowerBiRepository implements IPowerBiRepository {
  constructor(
    @InjectRepository(ActivityHistoryModel)
    private activityHistoryRepo: Repository<ActivityHistoryModel>,
  ) {}

  async findLastActivityBy({
    activity,
  }: IPowerBiRepository.FindLastActivityByInput): Promise<IPowerBiRepository.FindLastActivityByOutput> {
    const result = await this.activityHistoryRepo.find({
      where: { activity: activity },
      order: { occurredAt: 'DESC' },
      take: 1,
    })

    if (result.length === 0) return null

    return PowerBiMapper.toDomain(result[0])
  }

  async findLastActivity(): Promise<ActivityHistory> {
    const result = await this.activityHistoryRepo.find({
      order: { occurredAt: 'DESC' },
      take: 1,
    })

    if (result.length === 0) return null

    return PowerBiMapper.toDomain(result[0])
  }

  async registerActivity(entity: ActivityHistory): Promise<void> {
    await this.activityHistoryRepo.insert(PowerBiMapper.toPersistence(entity))
  }
}
