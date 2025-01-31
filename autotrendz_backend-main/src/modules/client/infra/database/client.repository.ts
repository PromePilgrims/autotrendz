import { Client, IClientRepository } from '@/modules/client/domain'
import { ClientMapper } from '@/modules/client/infra'
import { ClientEntity } from '@/modules/client/infra/database/entities'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

export class ClientRepository implements IClientRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepo: Repository<ClientEntity>,
  ) {}

  async save(client: Client): Promise<void> {
    await this.clientRepo.save(ClientMapper.toPersistence(client))
  }

  async findOneBy(
    where: IClientRepository.Where,
    withDeleted: boolean,
  ): Promise<Client> {
    if (withDeleted == undefined) withDeleted = false

    const client = await this.clientRepo.findOne({
      where,
      withDeleted,
    })
    return client ? ClientMapper.toDomain(client) : null
  }

  async findAll(): Promise<Client[]> {
    const clients = await this.clientRepo.find()
    return clients.map((client) => ClientMapper.toDomain(client))
  }
}
