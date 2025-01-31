import { FolderId, File } from '@/modules/folder/domain/entity'
import { FolderNameValueObject } from '@/modules/folder/domain/value-object'
import { ClientId } from '@/modules/client/domain'
import { UniqueEntityID } from '@/modules/@shared/domain'

export type FolderProps = {
  id: FolderId
  name: string
  parent_id?: string
  subFolders?: Folder[]
  files?: File[]
  created_by: string
  created_at?: Date
  updated_at?: Date
}

export type FolderClientProps = {
  id: ClientId
  name?: string
}

export class Folder {
  private _clients: FolderClientProps[] = []

  private constructor(
    private readonly _id: FolderId,
    private _name: FolderNameValueObject,
    private readonly _parentId: FolderId,
    private readonly _subFolders: Folder[] = [],
    private readonly _files: File[] = [],
    private _createdBy: string,
    private readonly _createdAt: Date,
    private _updatedAt: Date,
  ) {}

  get id(): FolderId {
    return this._id
  }

  get name(): string {
    return this._name.value
  }

  get parentId(): FolderId {
    return this._parentId
  }

  get createdBy(): string {
    return this._createdBy
  }

  get createdAt(): Date {
    return this._createdAt
  }

  get updatedAt(): Date {
    return this._updatedAt
  }

  get subFolders(): Folder[] {
    return this._subFolders
  }

  get files(): File[] {
    return this._files
  }

  get clients(): FolderClientProps[] {
    return this._clients
  }

  setCreatedBy(created_by: string) {
    this._createdBy = created_by
  }

  changeName(name: FolderNameValueObject): void {
    this._name = name
  }

  changeClients(clients: FolderClientProps[]): void {
    this._clients = clients

    this._subFolders.forEach((subFolder) => {
      subFolder.changeClients(clients)
    })
  }

  updateSubFolder(subFolder: Folder): void {
    const subFolderIndex = this._subFolders.findIndex(
      (curSubFolder) => curSubFolder.id === subFolder.id,
    )

    if (subFolderIndex >= 0) {
      this._subFolders[subFolderIndex] = subFolder
    }
  }

  addSubFolder(subFolder: Folder): void {
    if (
      this._subFolders.some((existingSubFolder) =>
        existingSubFolder.id.equals(subFolder.id),
      )
    ) {
      throw new Error('Sub folder already exists')
    }

    this._subFolders.push(subFolder)
  }

  removeSubFolder(subFolderId: FolderId): void {
    const subFolderIndex = this._subFolders.findIndex((subFolder) =>
      subFolder.id.equals(subFolderId),
    )

    if (subFolderIndex >= 0) {
      this._subFolders.splice(subFolderIndex, 1)
    }
  }

  addFile(file: File): void {
    if (this._files.some((existingFile) => existingFile.id.equals(file.id))) {
      throw new Error('File already exists')
    }

    this._files.push(file)
  }

  static create({
    id,
    name,
    parent_id,
    subFolders,
    files,
    created_by,
    created_at,
    updated_at,
  }: FolderProps): Folder {
    const now = new Date()

    const folder = new Folder(
      id,
      FolderNameValueObject.create(name),
      parent_id ? FolderId.create(new UniqueEntityID(parent_id)) : null,
      subFolders,
      files,
      created_by,
      created_at ?? now,
      updated_at ?? now,
    )

    return new Proxy(folder, {
      set: (target, prop, value) => {
        target[prop] = value
        target['_updatedAt'] = new Date()
        return true
      },
    })
  }
}
