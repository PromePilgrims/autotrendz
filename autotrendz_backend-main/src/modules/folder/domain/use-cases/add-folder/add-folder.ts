import { Folder, IFolderRepository } from '@/modules/folder/domain'
import { FolderId } from '@/modules/folder/domain/entity'

import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class AddFolder {
  constructor(
    @Inject('FolderRepository')
    private readonly folderRepository: IFolderRepository,
  ) {}

  async exec({
    parent_id,
    name,
    created_by,
  }: AddFolder.Input): Promise<AddFolder.Output> {
    try {
      if (
        parent_id &&
        !(await this.folderRepository.findBy({
          id: parent_id,
        }))
      ) {
        throw new Error('Parent not found')
      }

      const folder = Folder.create({
        id: FolderId.create(),
        name: name,
        parent_id: parent_id ?? null,
        created_by,
      })

      await this.folderRepository.save(folder)

      return folder
    } catch {
      throw new Error('Could not add folder')
    }
  }
}

export namespace AddFolder {
  export type Input = {
    parent_id?: string
    name: string
    created_by: string
  }

  export type Output = Folder
}
