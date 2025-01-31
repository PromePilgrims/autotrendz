import { Client } from '@/modules/client/domain/client'

export interface IClientService {
  findByEmail: (
    input: IClientService.FindByEmailInput,
  ) => Promise<IClientService.FindByEmailOutput>
  registerLogin(client: Client): Promise<void>
}

export namespace IClientService {
  export type FindByEmailInput = {
    email: string
  }

  export type FindByEmailOutput = Client
}
