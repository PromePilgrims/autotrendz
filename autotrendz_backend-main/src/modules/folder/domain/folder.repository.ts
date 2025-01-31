import { Folder } from '@/modules/folder/domain'

export type FolderWhere = {
  id?: string
}

export type FolderOwnWhere = FolderWhere & {
  client_id: string
}

export interface IFolderRepository {
  save(folder: Folder): Promise<void>
  findBy(where: FolderWhere): Promise<Folder>
  findAll(where?: FolderOwnWhere): Promise<Folder[]>
  findOwnBy(where: FolderOwnWhere): Promise<Folder>
}
