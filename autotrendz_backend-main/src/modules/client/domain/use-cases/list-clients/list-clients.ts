import { IClientRepository } from '@/modules/client/domain'
import { Client } from '@/modules/client/domain/client'

import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class ListClients {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: IClientRepository,
  ) {}

  async exec(): Promise<ListClients.Output> {
    try {
      const clients = await this.clientRepository.findAll()
      return clients
    } catch {
      throw new Error('Could not list clients')
    }
  }
}

export namespace ListClients {
  export type Output = Client[]
}
