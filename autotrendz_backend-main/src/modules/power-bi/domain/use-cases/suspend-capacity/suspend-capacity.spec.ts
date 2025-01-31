import { SuspendCapacity } from '@/modules/power-bi/domain/use-cases'
import { IPowerBiRepository, IPowerBiService } from '@/modules/power-bi/domain'

import { MockProxy, mock } from 'jest-mock-extended'

describe('suspend-capacity', () => {
  let powerBiRepository: MockProxy<IPowerBiRepository>
  let powerBiService: MockProxy<IPowerBiService>
  let sut: SuspendCapacity

  beforeEach(() => {
    powerBiService = mock()
    powerBiRepository = mock()
    sut = new SuspendCapacity(powerBiRepository, powerBiService)
  })

  it('should call powerbi service suspend capacity correctly', async () => {
    await sut.exec()
    expect(powerBiService.suspendCapacity).toBeCalledTimes(1)
    expect(powerBiRepository.registerActivity).toBeCalledTimes(1)
  })
})
