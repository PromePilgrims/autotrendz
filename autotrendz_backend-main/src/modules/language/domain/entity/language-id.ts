import { UniqueEntityID } from '@/modules/@shared/domain'

export class LanguageId {
  private readonly _id: UniqueEntityID

  get id(): UniqueEntityID {
    return this._id
  }

  toString(): string {
    return this._id.toString()
  }

  equals(id?: LanguageId): boolean {
    if (!(id instanceof LanguageId)) {
      return false
    }

    return id.id.equals(this._id)
  }

  private constructor(id?: UniqueEntityID) {
    this._id = id || new UniqueEntityID()
  }

  public static create(id?: UniqueEntityID): LanguageId {
    return new LanguageId(id)
  }
}
