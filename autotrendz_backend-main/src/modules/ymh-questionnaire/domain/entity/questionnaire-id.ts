import { UniqueEntityID } from '@/modules/@shared/domain'

export class QuestionnaireId {
  private readonly _id: UniqueEntityID

  get id(): UniqueEntityID {
    return this._id
  }

  toString(): string {
    return this._id.toString()
  }

  private constructor(id?: UniqueEntityID) {
    this._id = id || new UniqueEntityID()
  }

  public static create(id?: UniqueEntityID): QuestionnaireId {
    return new QuestionnaireId(id)
  }
}
