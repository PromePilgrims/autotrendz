import { Client, ClientId } from '@/modules/client/domain'
import { UniqueEntityID } from '@/modules/@shared/domain'
import { ClientEntity } from '@/modules/client/infra/database/entities'

export class ClientMapper {
  static toDomain(clientEntity: ClientEntity): Client {
    const client = Client.create({
      id: ClientId.create(new UniqueEntityID(clientEntity.id)),
      name: clientEntity.name,
      email: clientEntity.email,
      password: clientEntity.password,
      image: clientEntity.image,
      createdAt: clientEntity.createdAt,
      updatedAt: clientEntity.updatedAt,
      deletedAt: clientEntity.deletedAt,
      lastLoginAt: clientEntity.lastLoginAt,
    })

    client.setRole(clientEntity.role)

    if (clientEntity.active) {
      client.activate()
    }

    return client
  }

  static toPersistence(client: Client): ClientEntity {
    const clientEntity = new ClientEntity()
    clientEntity.id = client.id.toString()
    clientEntity.name = client.name.value
    clientEntity.email = client.email.value
    clientEntity.password = client.password.value
    clientEntity.image = client.image.value
    clientEntity.role = client.role
    clientEntity.active = client.isActive
    clientEntity.createdAt = client.createdAt
    clientEntity.updatedAt = client.updatedAt
    clientEntity.deletedAt = client.deletedAt
    clientEntity.lastLoginAt = client.lastLoginAt

    return clientEntity
  }
}
