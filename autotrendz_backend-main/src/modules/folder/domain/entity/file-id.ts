import { UniqueEntityID } from '@/modules/@shared/domain'

export class FileId {
  private readonly _id: UniqueEntityID

  get id(): UniqueEntityID {
    return this._id
  }

  toString(): string {
    return this._id.toString()
  }

  equals(id?: FileId): boolean {
    if (!(id instanceof FileId)) {
      return false
    }

    return id.id.equals(this._id)
  }

  private constructor(id?: UniqueEntityID) {
    this._id = id || new UniqueEntityID()
  }

  public static create(id?: UniqueEntityID): FileId {
    return new FileId(id)
  }
}
