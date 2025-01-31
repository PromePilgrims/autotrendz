import { ListClient } from '@/modules/client/domain/use-cases'
import { Client, ClientId, IClientRepository } from '@/modules/client/domain'

import { MockProxy, mock } from 'jest-mock-extended'

describe('list-client', () => {
  let clientRepository: MockProxy<IClientRepository>
  let client_id: ClientId
  let client: Client
  let sut: ListClient

  beforeEach(() => {
    clientRepository = mock()
    client_id = ClientId.create()
    client = Client.create({
      id: client_id,
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_pass',
    })
    sut = new ListClient(clientRepository)
  })

  it('should throw if findOneBy throws', async () => {
    const id = client.id.toString()
    clientRepository.findOneBy.mockRejectedValueOnce(new Error('any_error'))

    const result = async () => sut.exec({ id })

    expect(result).rejects.toThrow(
      new Error(`Could not list client with id ${id}`),
    )
  })

  it('should return null if client is not found', async () => {
    clientRepository.findOneBy.mockResolvedValueOnce(null)

    const result = await sut.exec({ id: client.id.toString() })

    expect(result).toBeNull()
  })
})
