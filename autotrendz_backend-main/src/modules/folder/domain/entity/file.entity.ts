import { FileId, FolderId } from '@/modules/folder/domain/entity'
import { FolderNameValueObject } from '@/modules/folder/domain/value-object'
import { URLValueObject } from '@/modules/@shared/domain/value-object'
import { UniqueEntityID } from '@/modules/@shared/domain'

export type FileProps = {
  id: FileId
  parent_id: string
  name: string
  created_by: string
  mimetype?: string
  size?: number
  created_at?: Date
  updated_at?: Date
}

export class File {
  private _name: FolderNameValueObject
  private _src: URLValueObject

  private constructor(
    private readonly _id: FileId,
    private readonly _parentId: FolderId,
    private readonly _mimetype: string,
    private readonly _size: number,
    private readonly _createdBy: string,
    private readonly _createdAt: Date,
    private readonly _updatedAt: Date,
  ) {}

  get id(): FileId {
    return this._id
  }

  get name(): string {
    return this._name.value
  }

  get src(): string {
    return this._src.value
  }

  get mimetype(): string {
    return this._mimetype
  }

  get size(): number {
    return this._size
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

  setSrc(src: URLValueObject): void {
    this._src = src
  }

  changeName(name: FolderNameValueObject): void {
    this._name = name
  }

  static create({
    id,
    parent_id,
    name,
    size,
    mimetype,
    created_by,
    created_at,
    updated_at,
  }: FileProps): File {
    const now = new Date()

    const file = new File(
      id,
      FolderId.create(new UniqueEntityID(parent_id)),
      mimetype,
      size,
      created_by,
      created_at ?? now,
      updated_at ?? now,
    )

    file.changeName(FolderNameValueObject.create(name))

    return file
  }
}
