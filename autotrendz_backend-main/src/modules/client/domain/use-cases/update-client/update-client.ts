import { Client, IClientRepository } from '@/modules/client/domain'
import {
  ImageValueObject,
  NameValueObject,
} from '@/modules/@shared/domain/value-object'
import { IFileUploadService } from '@/modules/@shared/domain/contracts'

import { Inject, Injectable } from '@nestjs/common'
import { slugify } from '@/utils'
import { ClientRole } from '@/modules/client/domain/entity'

@Injectable()
export class UpdateClient {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: IClientRepository,
    @Inject('FileService')
    private readonly fileService: IFileUploadService,
  ) {}

  async exec({
    id,
    name,
    image,
    active,
    role,
  }: UpdateClient.Input): Promise<UpdateClient.Output> {
    const client = await this.clientRepository.findOneBy({ id })
    if (!client) throw new Error('Client not found')

    try {
      if (name) {
        client.changeName(NameValueObject.create(name))
      }

      if (image) {
        const newImage = await this.fileService.upload({
          fileName: `clients/images/${slugify(name)}-${id}.${
            image.mimetype.split('/')[1]
          }`,
          buffer: image.buffer,
        })

        client.changeImage(ImageValueObject.create(newImage))
      }

      if (active !== undefined && client.isActive !== active) {
        active === true ? client.activate() : client.deactivate()
      }

      if (role !== undefined && client.role !== role) {
        client.setRole(role)
      }

      await this.clientRepository.save(client)
      return client
    } catch {
      throw new Error('Could not update client')
    }
  }
}

export namespace UpdateClient {
  export type Input = {
    id: string
    name?: string
    active?: boolean
    role?: ClientRole
    image?: {
      buffer: Buffer
      mimetype: string
    }
  }

  export type Output = Client
}
