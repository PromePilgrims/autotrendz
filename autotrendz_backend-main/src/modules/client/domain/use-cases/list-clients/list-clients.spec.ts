import { ListClients } from '@/modules/client/domain/use-cases'
import { IClientRepository } from '@/modules/client/domain/client.repository'

import { MockProxy, mock } from 'jest-mock-extended'
import { Client, ClientId } from '@/modules/client/domain'

describe('list-clients', () => {
  let clientRepository: MockProxy<IClientRepository>
  let clients: Client[]
  let sut: ListClients

  beforeEach(() => {
    clientRepository = mock()
    clients = [
      Client.create({
        id: ClientId.create(),
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_pass',
      }),
      Client.create({
        id: ClientId.create(),
        name: 'any_name_2',
        email: 'any_email_2@email.com',
        password: 'any_pass',
      }),
    ]
    sut = new ListClients(clientRepository)
  })

  it('should return empty array if no client is found', () => {
    clientRepository.findAll.mockResolvedValueOnce([])

    const result = sut.exec()

    expect(result).resolves.toEqual([])
  })

  it('should return clients if they are found', () => {
    clientRepository.findAll.mockResolvedValueOnce(clients)

    const result = sut.exec()

    expect(result).resolves.toEqual(clients)
  })
})
