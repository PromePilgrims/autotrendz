import { Client, IClientRepository } from '@/modules/client/domain'

import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class DeleteClient {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: IClientRepository,
  ) {}

  async exec({ id }: DeleteClient.Input): Promise<DeleteClient.Output> {
    const client = await this.clientRepository.findOneBy({ id })
    if (!client) throw new Error('Client not found')

    client.deactivate()
    client.delete()

    await this.clientRepository.save(client)

    return client
  }
}

export namespace DeleteClient {
  export type Input = {
    id: string
  }

  export type Output = Client
}
