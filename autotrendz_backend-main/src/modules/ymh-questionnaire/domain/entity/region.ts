import { RegionId } from '@/modules/ymh-questionnaire/domain/entity'

export type RegionProps = {
  id: RegionId
  name: string
  description: string
  created_at: Date
}

export class Region {
  private constructor(
    private readonly _id: RegionId,
    private readonly _name: string,
    private readonly _description: string,
    private readonly _created_at: Date,
  ) {}

  get id(): RegionId {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get description(): string {
    return this._description
  }

  get created_at(): Date {
    return this._created_at
  }

  static create({ id, name, description, created_at }: RegionProps): Region {
    return new Region(id, name, description, created_at)
  }
}
