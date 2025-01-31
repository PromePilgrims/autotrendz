import { Folder, IFolderRepository } from '@/modules/folder/domain'
import { FolderNameValueObject } from '@/modules/folder/domain/value-object'
import { ClientId } from '@/modules/client/domain'
import { UniqueEntityID } from '@/modules/@shared/domain'

import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class UpdateFolder {
  constructor(
    @Inject('FolderRepository')
    private readonly folderRepository: IFolderRepository,
  ) {}

  async exec({
    id,
    name,
    client_ids,
  }: UpdateFolder.Input): Promise<UpdateFolder.Output> {
    const folder = await this.folderRepository.findBy({ id })

    if (name) {
      folder.changeName(FolderNameValueObject.create(name))
    }

    if (client_ids) {
      if (folder.parentId) {
        throw new Error(`Cannot update clients of a folders' child`)
      }

      folder.changeClients(
        client_ids.map((id) => ({
          id: ClientId.create(new UniqueEntityID(id)),
        })),
      )
    }

    await this.folderRepository.save(folder)

    return folder
  }
}

export namespace UpdateFolder {
  export type Input = {
    id: string
    name?: string
    client_ids?: string[]
  }

  export type Output = Folder
}
