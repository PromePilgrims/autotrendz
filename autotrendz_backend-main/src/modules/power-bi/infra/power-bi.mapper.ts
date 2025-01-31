import { UniqueEntityID } from '@/modules/@shared/domain'
import {
  ActivityHistory,
  PowerBiActivity,
} from '@/modules/power-bi/domain/entity'
import { ActivityHistory as ActivityHistoryModel } from '@/modules/power-bi/infra/database/entities'

export class PowerBiMapper {
  static toDomain(entity: ActivityHistoryModel): ActivityHistory {
    return ActivityHistory.create({
      id: new UniqueEntityID(entity.id),
      activity: PowerBiActivity[entity.activity],
      triggeredBy: entity.triggeredBy,
      occurredAt: entity.occurredAt,
      data: entity.data,
    })
  }

  static toPersistence(entity: ActivityHistory): ActivityHistoryModel {
    const model = new ActivityHistoryModel()
    model.id = entity.id.toString()
    model.activity = PowerBiActivity[entity.activity]
    model.occurredAt = entity.occurredAt
    model.triggeredBy = entity.triggeredBy
    model.data = entity.data

    return model
  }
}
