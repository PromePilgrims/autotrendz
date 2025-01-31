import {
  IntervieweeId,
  Region,
} from '@/modules/ymh-questionnaire/domain/entity'

type IntervieweeProps = {
  id: IntervieweeId
  name: string
  phone: string
  made_revision: boolean
  region: Region
  created_at: Date
}

export class Interviewee {
  private constructor(
    private readonly _id: IntervieweeId,
    private readonly _name: string,
    private readonly _phone: string,
    private readonly _made_revision: boolean,
    private readonly _region: Region,
    private readonly _created_at?: Date,
  ) {}

  get id(): IntervieweeId {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get phone(): string {
    return this._phone
  }

  get made_revision(): boolean {
    return this._made_revision
  }

  get region(): Region {
    return this._region
  }

  get created_at(): Date | undefined {
    return this._created_at
  }

  static create({
    id,
    name,
    phone,
    made_revision,
    region,
    created_at,
  }: IntervieweeProps): Interviewee {
    return new Interviewee(
      id,
      name,
      phone,
      made_revision,
      region,
      created_at ?? new Date(),
    )
  }
}
