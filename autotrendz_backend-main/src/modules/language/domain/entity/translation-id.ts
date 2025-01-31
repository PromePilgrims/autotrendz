import { UniqueEntityID } from '@/modules/@shared/domain'

export class TranslationId {
  private readonly _id: UniqueEntityID

  get id(): UniqueEntityID {
    return this._id
  }

  toString(): string {
    return this._id.toString()
  }

  equals(id?: TranslationId): boolean {
    if (!(id instanceof TranslationId)) {
      return false
    }

    return id.id.equals(this._id)
  }

  private constructor(id?: UniqueEntityID) {
    this._id = id || new UniqueEntityID()
  }

  public static create(id?: UniqueEntityID): TranslationId {
    return new TranslationId(id)
  }
}
