import { UniqueEntityID } from '@/modules/@shared/domain'

export enum PowerBiActivity {
  SUSPENDED = 'SUSPENDED',
  RESUMED = 'RESUMED',
  TOKEN_GENERATED = 'TOKEN_GENERATED',
  REPORT_OPENED = 'REPORT_OPENED',
}

type ActivityHistoryProps = {
  id?: UniqueEntityID
  activity: PowerBiActivity
  triggeredBy?: string
  occurredAt?: Date
  data?: any
}

export class ActivityHistory {
  private constructor(
    public readonly id: UniqueEntityID,
    public readonly activity: PowerBiActivity,
    public readonly triggeredBy: string = 'SYSTEM',
    public readonly occurredAt: Date = new Date(),
    public readonly data?: any,
  ) {}

  static create({
    id,
    activity,
    triggeredBy,
    occurredAt,
    data,
  }: ActivityHistoryProps): ActivityHistory {
    return new ActivityHistory(
      id ? id : new UniqueEntityID(),
      activity,
      triggeredBy,
      occurredAt,
      data,
    )
  }
}
