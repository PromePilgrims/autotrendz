import { PowerBiMapper } from '@/modules/power-bi/infra'
import { PowerBiRepository } from '@/modules/power-bi/infra/database'
import { ActivityHistory } from '@/modules/power-bi/infra/database/entities'
import {
  ActivityHistory as ActivityHistoryEntity,
  PowerBiActivity,
} from '@/modules/power-bi/domain/entity'

import { Repository, DataSource } from 'typeorm'
import { UniqueEntityID } from '@/modules/@shared/domain'

describe('power-bi.repository', () => {
  let activityHistoryRepo: Repository<ActivityHistory>
  let activity: ActivityHistoryEntity
  let sut: PowerBiRepository

  beforeEach(async () => {
    const dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      entities: [ActivityHistory],
      synchronize: true,
      logging: false,
    })
    await dataSource.initialize()
    activityHistoryRepo = dataSource.getRepository(ActivityHistory)
    sut = new PowerBiRepository(activityHistoryRepo)
    activity = ActivityHistoryEntity.create({
      id: new UniqueEntityID('activity-id'),
      activity: PowerBiActivity.TOKEN_GENERATED,
      occurredAt: new Date('2021-01-01'),
      triggeredBy: 'SYSTEM',
      data: 'any additional data here',
    })
  })

  afterEach(async () => {
    await activityHistoryRepo.clear()
    await activityHistoryRepo.manager.connection.destroy()
  })

  it('should return null if no activity is found', async () => {
    const result = await sut.findLastActivityBy({
      activity: PowerBiActivity.TOKEN_GENERATED,
    })

    expect(result).toBeNull()
  })

  it('should findLastActivity correctly', async () => {
    await activityHistoryRepo.insert(PowerBiMapper.toPersistence(activity))

    const result = await sut.findLastActivityBy({
      activity: PowerBiActivity.TOKEN_GENERATED,
    })

    expect(result).toEqual({
      id: new UniqueEntityID('activity-id'),
      activity: PowerBiActivity.TOKEN_GENERATED,
      occurredAt: new Date('2021-01-01'),
      triggeredBy: 'SYSTEM',
      data: 'any additional data here',
    })
  })

  it('should registerActivity correctly', async () => {
    await sut.registerActivity(activity)

    expect(await activityHistoryRepo.count()).toBe(1)
  })
})
