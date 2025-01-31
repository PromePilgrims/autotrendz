import { UniqueEntityID } from '@/modules/@shared/domain'

export class FolderId {
  private readonly _id: UniqueEntityID

  get id(): UniqueEntityID {
    return this._id
  }

  toString(): string {
    return this._id.toString()
  }

  equals(id?: FolderId): boolean {
    if (!(id instanceof FolderId)) {
      return false
    }

    return id.id.equals(this._id)
  }

  private constructor(id?: UniqueEntityID) {
    this._id = id || new UniqueEntityID()
  }

  public static create(id?: UniqueEntityID): FolderId {
    return new FolderId(id)
  }
}
