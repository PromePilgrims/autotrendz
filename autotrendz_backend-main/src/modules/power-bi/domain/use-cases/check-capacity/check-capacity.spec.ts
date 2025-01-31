import { IPowerBiRepository } from '@/modules/power-bi/domain'
import {
  ActivityHistory,
  PowerBiActivity,
} from '@/modules/power-bi/domain/entity'
import {
  CheckCapacity,
  SuspendCapacity,
} from '@/modules/power-bi/domain/use-cases'

import { MockProxy, mock } from 'jest-mock-extended'

describe('check-capacity', () => {
  let powerBiRepository: MockProxy<IPowerBiRepository>
  let suspendCapacityUseCase: MockProxy<SuspendCapacity>
  let sut: CheckCapacity

  beforeEach(() => {
    powerBiRepository = mock()
    suspendCapacityUseCase = mock()
    sut = new CheckCapacity(powerBiRepository, suspendCapacityUseCase)
  })

  it('should return void if last activity is equal to SUSPENDED', async () => {
    powerBiRepository.findLastActivity.mockResolvedValueOnce(
      ActivityHistory.create({
        activity: PowerBiActivity.SUSPENDED,
        occurredAt: new Date(),
      }),
    )

    const result = await sut.exec()

    expect(result).toBeUndefined()
    expect(powerBiRepository.findLastActivityBy).not.toBeCalled()
  })

  it('should call findLastActivity with correct params', async () => {
    await sut.exec()

    expect(powerBiRepository.findLastActivityBy).toBeCalledWith({
      activity: PowerBiActivity.REPORT_OPENED,
    })
  })

  it('should call suspendCapacity use-case when last activity was more or equal than the defined minutes', async () => {
    powerBiRepository.findLastActivityBy.mockResolvedValueOnce(
      ActivityHistory.create({
        activity: PowerBiActivity.REPORT_OPENED,
        occurredAt: new Date(new Date().getTime() + 10 * 60000),
      }),
    )

    await sut.exec()

    expect(suspendCapacityUseCase.exec).toBeCalledTimes(1)
  })
})
