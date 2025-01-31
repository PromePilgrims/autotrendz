import { Client } from '@/modules/client/domain'

export interface IClientRepository {
  save(client: Client): Promise<void>
  findOneBy(
    where: IClientRepository.Where,
    withDeleted?: boolean,
  ): Promise<Client>
  findAll(): Promise<Client[]>
}

export namespace IClientRepository {
  export type Where = {
    id?: string
    email?: string
    deletedAt?: Date
  }
}
