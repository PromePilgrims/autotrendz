import { Folder, IFolderRepository } from '@/modules/folder/domain'
import { User } from '@/modules/auth/domain'
import { AuthService } from '@/modules/auth/infra'

import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class ListFolders {
  constructor(
    @Inject('FolderRepository')
    private readonly folderRepository: IFolderRepository,
    @Inject('AuthService')
    private readonly authService: AuthService,
  ) {}

  async exec({ user }: ListFolders.Input): Promise<ListFolders.Output> {
    try {
      const admin = this.authService.hasAdminRole(user)

      const folders = await this.folderRepository.findAll({
        client_id: admin ? undefined : user.sub,
      })

      return folders
    } catch {
      throw new Error('Could not list folders')
    }
  }
}

export namespace ListFolders {
  export type Input = {
    user: User
  }
  export type Output = Folder[]
}
