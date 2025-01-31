import { PowerBiController } from '@/modules/power-bi/application/controllers'
import { GetEmbedToken } from '@/modules/power-bi/domain/use-cases'

import { Test } from '@nestjs/testing'

describe('power-bi.controller', function () {
  let powerBiController: PowerBiController

  const getEmbedTokenUseCaseSpy = jest.fn()

  beforeEach(async function () {
    const moduleRef = await Test.createTestingModule({
      providers: [PowerBiController],
    })
      .useMocker((token) => {
        switch (token) {
          case GetEmbedToken:
            return {
              exec: getEmbedTokenUseCaseSpy,
            }
          default:
            return jest.fn()
        }
      })
      .compile()

    powerBiController = moduleRef.get<PowerBiController>(PowerBiController)
  })

  it('should call the get embed token use-case correctly', async function () {
    await powerBiController.getEmbedTokenHandler({
      workspaceId: 'workspace-id',
      reportId: 'report-id',
    })

    expect(getEmbedTokenUseCaseSpy).toHaveBeenCalledWith({
      workspaceId: 'workspace-id',
      reportId: 'report-id',
    })
  })
})
