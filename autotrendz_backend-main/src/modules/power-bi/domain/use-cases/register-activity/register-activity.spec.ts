import { RegisterActivity } from '@/modules/power-bi/domain/use-cases'
import { IPowerBiRepository } from '@/modules/power-bi/domain'

import { MockProxy, mock } from 'jest-mock-extended'

describe('register-activity', () => {
  let powerBiRepository: MockProxy<IPowerBiRepository>
  let params: RegisterActivity.Input
  let sut: RegisterActivity

  beforeEach(() => {
    powerBiRepository = mock()
    sut = new RegisterActivity(powerBiRepository)
    params = {
      workspaceId: 'any_workspace_id',
      reportId: 'any_id',
      userId: 'any_user_id',
    }
  })

  it('should call powerbi repository register activity correctly', async () => {
    await sut.exec(params)
    expect(powerBiRepository.registerActivity).toBeCalledTimes(1)
  })
})
