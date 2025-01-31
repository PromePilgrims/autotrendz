import {
  ActivityHistory,
  PowerBiActivity,
} from '@/modules/power-bi/domain/entity'

export interface IPowerBiRepository {
  findLastActivityBy(
    params: IPowerBiRepository.FindLastActivityByInput,
  ): Promise<IPowerBiRepository.FindLastActivityByOutput>
  findLastActivity(): Promise<IPowerBiRepository.FindLastActivityOutput>
  registerActivity(
    params: IPowerBiRepository.RegisterActivityInput,
  ): Promise<void>
}

export namespace IPowerBiRepository {
  export type FindLastActivityByInput = { activity: PowerBiActivity }
  export type FindLastActivityByOutput = ActivityHistory
  export type FindLastActivityOutput = ActivityHistory
  export type RegisterActivityInput = ActivityHistory
}
