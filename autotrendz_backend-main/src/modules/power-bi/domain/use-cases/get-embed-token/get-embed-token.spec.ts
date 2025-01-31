import { IPowerBiRepository, IPowerBiService } from '@/modules/power-bi/domain'
import { EmbedToken } from '@/modules/power-bi/domain/entity'
import {
  GetEmbedToken,
  ResumeCapacity,
} from '@/modules/power-bi/domain/use-cases'

import { mock, MockProxy } from 'jest-mock-extended'

describe('get-embed-token.use-case', () => {
  let powerBiRepository: MockProxy<IPowerBiRepository>
  let powerBiService: MockProxy<IPowerBiService>
  let embedToken: EmbedToken
  let resumeCapacity: ResumeCapacity
  let sut: GetEmbedToken

  beforeEach(() => {
    powerBiService = mock()
    powerBiRepository = mock()
    resumeCapacity = mock()
    embedToken = new EmbedToken(
      'any-token',
      'any-report-name',
      'any-embed-url',
      new Date('2021-01-01'),
    )
    sut = new GetEmbedToken(powerBiRepository, powerBiService, resumeCapacity)
  })

  it('should throw if getEmbedToken throws', async () => {
    powerBiService.getEmbedToken.mockResolvedValueOnce(null)

    const result = async () => {
      await sut.exec({ reportId: 'reportId', workspaceId: 'workspaceId' })
    }

    expect(result).rejects.toThrow(new Error('Could not get the embed token'))
  })

  it('should call getEmbedToken method from powerBiService with correct params', async () => {
    powerBiService.getEmbedToken.mockResolvedValue(embedToken)

    const result = await sut.exec({
      reportId: 'reportId',
      workspaceId: 'workspaceId',
    })

    expect(powerBiService.getEmbedToken).toBeCalledTimes(1)
    expect(powerBiService.getEmbedToken).toBeCalledWith({
      reportId: 'reportId',
      workspaceId: 'workspaceId',
    })
    expect(result.token).toBe('any-token')
    expect(result.reportName).toBe('any-report-name')
    expect(result.embedUrl).toBe('any-embed-url')
    expect(result.expiration).toEqual(new Date('2021-01-01'))
    expect(powerBiRepository.registerActivity).toBeCalledTimes(1)
  })

  it('should return the embed token', async () => {
    powerBiService.getEmbedToken.mockResolvedValue(embedToken)

    const result = await sut.exec({
      reportId: 'reportId',
      workspaceId: 'workspaceId',
    })

    expect(result).toBe(embedToken)
    expect(powerBiRepository.registerActivity).toBeCalledTimes(1)
  })
})
