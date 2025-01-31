import { Folder, IFolderRepository } from '@/modules/folder/domain'
import { File, FileId } from '@/modules/folder/domain/entity'
import { URLValueObject } from '@/modules/@shared/domain/value-object'

import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AddFile {
  constructor(
    @Inject('FolderRepository')
    private readonly folderRepository: IFolderRepository,
    private readonly configService: ConfigService,
  ) {}

  async exec({
    parent_id,
    name,
    created_by,
    size,
    mimetype,
  }: AddFile.Input): Promise<AddFile.Output> {
    try {
      if (
        !parent_id ||
        !(await this.folderRepository.findBy({
          id: parent_id,
        }))
      ) {
        throw new Error('Parent not found')
      }

      const folder = await this.folderRepository.findBy({
        id: parent_id,
      })

      const file = File.create({
        id: FileId.create(),
        name,
        parent_id,
        created_by,
        size,
        mimetype,
      })

      const s3url = `${this.configService.get(
        'S3_ENDPOINT',
      )}/${this.configService.get('BUCKET_NAME')}`
      const src = `${s3url}/folders/${folder.id.toString()}/${file.name}`

      file.setSrc(URLValueObject.create(src))

      folder.addFile(file)

      await this.folderRepository.save(folder)

      return folder
    } catch (error) {
      throw error
    }
  }
}

export namespace AddFile {
  export type Input = {
    parent_id: string
    name: string
    created_by: string
    mimetype: string
    size: number
  }

  export type Output = Folder
}
