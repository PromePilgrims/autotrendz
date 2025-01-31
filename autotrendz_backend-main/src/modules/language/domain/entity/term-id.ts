import { UniqueEntityID } from '@/modules/@shared/domain'

export class TermId {
  private readonly _id: UniqueEntityID

  get id(): UniqueEntityID {
    return this._id
  }

  toString(): string {
    return this._id.toString()
  }

  equals(id?: TermId): boolean {
    if (!(id instanceof TermId)) {
      return false
    }

    return id.id.equals(this._id)
  }

  private constructor(id?: UniqueEntityID) {
    this._id = id || new UniqueEntityID()
  }

  public static create(id?: UniqueEntityID): TermId {
    return new TermId(id)
  }
}
