import { IFileUploadService } from '@/modules/@shared/domain/contracts'
import { Client } from '@/modules/client/domain/client'
import { IClientRepository } from '@/modules/client/domain/client.repository'
import { ClientId } from '@/modules/client/domain/entity'
import { UpdateClient } from '@/modules/client/domain/use-cases/update-client/update-client'
import { MockProxy, mock } from 'jest-mock-extended'

describe('update-client', () => {
  let clientRepository: MockProxy<IClientRepository>
  let fileUploadService: MockProxy<IFileUploadService>
  let client: Client
  let sut: UpdateClient

  beforeEach(() => {
    clientRepository = mock()
    fileUploadService = mock()
    client = Client.create({
      id: ClientId.create(),
      email: 'any@email.com',
      name: 'any_name',
      password: '123456',
      image: 'any_image',
    })
    client.activate()
    sut = new UpdateClient(clientRepository, fileUploadService)
  })

  it('should throw if findOneBy throws', async () => {
    clientRepository.findOneBy.mockRejectedValueOnce(new Error('any_error'))

    const result = async () => {
      await sut.exec({ id: 'any_id' })
    }

    expect(result).rejects.toThrow(new Error('any_error'))
  })

  it('should throw if any value value objects throws', async () => {
    clientRepository.findOneBy.mockResolvedValueOnce({} as Client)

    const result = async () => {
      await sut.exec({ id: 'any_id', name: '12' })
    }

    expect(result).rejects.toThrow(new Error('Could not update client'))
    expect(clientRepository.save).not.toBeCalled()
  })

  it('should call clientRepository.save with correct params', async () => {
    clientRepository.findOneBy.mockResolvedValueOnce(client)

    expect(client.isActive).toBeTruthy()

    const updatedClient = await sut.exec({ id: 'any_id', active: false })

    expect(updatedClient.isActive).toBeFalsy()
    expect(clientRepository.save).toBeCalledTimes(1)
    expect(clientRepository.save).toBeCalledWith(expect.any(Client))
  })
})
