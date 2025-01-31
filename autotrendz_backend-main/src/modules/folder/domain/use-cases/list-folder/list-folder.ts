import { Folder, IFolderRepository } from '@/modules/folder/domain'
import { User } from '@/modules/auth/domain'
import { AuthService } from '@/modules/auth/infra'

import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class ListFolder {
  constructor(
    @Inject('FolderRepository')
    private readonly folderRepository: IFolderRepository,
    @Inject('AuthService')
    private readonly authService: AuthService,
  ) {}

  async exec({ id, user }: ListFolder.Input): Promise<ListFolder.Output> {
    try {
      const admin = this.authService.hasAdminRole(user)

      const folder = admin
        ? await this.folderRepository.findBy({ id })
        : await this.folderRepository.findOwnBy({ id, client_id: user.sub })

      return folder
    } catch {
      throw new Error('Could not list folder')
    }
  }
}

export namespace ListFolder {
  export type Input = {
    user: User
    id: string
  }

  export type Output = Folder
}
