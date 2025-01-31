import { Client, IClientRepository } from '@/modules/client/domain'

import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class ListClient {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: IClientRepository,
  ) {}

  async exec({ id }: ListClient.Input): Promise<ListClient.Output> {
    try {
      const client = await this.clientRepository.findOneBy({ id })
      return client
    } catch {
      throw new Error(`Could not list client with id ${id}`)
    }
  }
}

export namespace ListClient {
  export type Input = {
    id: string
  }

  export type Output = Client
}
