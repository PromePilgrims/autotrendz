import { Folder, IFolderRepository } from '@/modules/folder/domain'
import { FolderNameValueObject } from '@/modules/folder/domain/value-object'

import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class UpdateFile {
  constructor(
    @Inject('FolderRepository')
    private readonly folderRepository: IFolderRepository,
  ) {}

  async exec({
    id,
    parent_id,
    name,
  }: UpdateFile.Input): Promise<UpdateFile.Output> {
    try {
      const folder = await this.folderRepository.findBy({ id: parent_id })

      const file = folder.files.find((file) => file.id.toString() == id)

      if (!file) {
        throw new Error('File not found')
      }

      file.changeName(FolderNameValueObject.create(name))

      await this.folderRepository.save(folder)

      return folder
    } catch {
      throw new Error('Could not update file')
    }
  }
}

export namespace UpdateFile {
  export type Input = {
    id: string
    parent_id: string
    name: string
  }

  export type Output = Folder
}
