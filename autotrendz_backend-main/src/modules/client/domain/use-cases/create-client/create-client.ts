import {
  Client,
  IClientRepository,
  ClientId,
  IEmailService,
} from '@/modules/client/domain'
import { ClientRole } from '@/modules/client/domain/entity'
import { IFileUploadService } from '@/modules/@shared/domain/contracts'
import { slugify } from '@/utils'

import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class CreateClient {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: IClientRepository,
    @Inject('FileService')
    private readonly fileService: IFileUploadService,
    @Inject('EmailService')
    private readonly emailService: IEmailService,
  ) {}

  async exec({
    name,
    email,
    password,
    imageFile,
    created_by,
  }: CreateClient.Input): Promise<CreateClient.Output> {
    if (await this.clientRepository.findOneBy({ email }, true))
      throw new Error('Client already exists')

    const id = ClientId.create()

    let image: string = null
    if (imageFile) {
      try {
        image = await this.fileService.upload({
          fileName: `clients/images/${slugify(name)}-${id.toString()}.${
            imageFile.mimetype.split('/')[1]
          }`,
          buffer: imageFile.buffer,
        })
      } catch {}
    }

    const client = Client.create({ id, name, email, password, image })
    client.setCreatedBy(created_by)

    await client.password.encrypt()

    this.emailService.notifyCredentials({ email, password })

    client.setRole(ClientRole.CLIENT)
    client.activate()

    try {
      await this.clientRepository.save(client)
      return client
    } catch {
      throw new Error('Could not create client')
    }
  }
}

export namespace CreateClient {
  export type Input = {
    name: string
    email: string
    password: string
    imageFile?: {
      buffer: Buffer
      mimetype: string
    }
    created_by: string
  }

  export type Output = Client
}
