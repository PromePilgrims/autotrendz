import { ResumeCapacity } from '@/modules/power-bi/domain/use-cases'
import { IPowerBiRepository, IPowerBiService } from '@/modules/power-bi/domain'

import { MockProxy, mock } from 'jest-mock-extended'

describe('resume-capacity', () => {
  let powerBiRepository: MockProxy<IPowerBiRepository>
  let powerBiService: MockProxy<IPowerBiService>
  let sut: ResumeCapacity

  beforeEach(() => {
    powerBiService = mock()
    powerBiRepository = mock()
    sut = new ResumeCapacity(powerBiRepository, powerBiService)
  })

  it('should call powerbi service resume capacity correctly', async () => {
    await sut.exec()
    expect(powerBiService.resumeCapacity).toBeCalledTimes(1)
    expect(powerBiRepository.registerActivity).toBeCalledTimes(1)
  })
})
