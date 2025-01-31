import { TermId, Translation } from '@/modules/language/domain/entity'

export type TermProps = {
  id?: TermId
  translations?: Translation[]
  section: string
  name: string
  code: string
  completed?: boolean
  created_by?: string
  created_at?: Date
  updated_at?: Date
}

export class Term {
  private constructor(
    private readonly _id: TermId,
    private _translations: Translation[] = [],
    private _section: string,
    private _name: string,
    private _code: string,
    private _completed: boolean = false,
    private readonly _createdBy: string,
    private readonly _createdAt: Date,
    private _updatedAt: Date,
  ) {}

  get id(): TermId {
    return this._id
  }

  get translations(): Translation[] {
    return this._translations
  }

  get section(): string {
    return this._section
  }

  get name(): string {
    return this._name
  }

  get code(): string {
    return this._code
  }

  get completed(): boolean {
    return this._completed
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

  changeName(name: string): void {
    this._name = name
  }

  changeCode(code: string): void {
    this._code = code
  }

  changeTranslations(translations: Translation[]): void {
    this._translations = translations
  }

  changeSection(section: string): void {
    this._section = section
  }

  complete(): void {
    this._completed = true
  }

  static create({
    id,
    translations,
    section,
    name,
    code,
    completed,
    created_by,
    created_at,
    updated_at,
  }: TermProps): Term {
    const now = new Date()

    const term = new Term(
      id,
      translations,
      section,
      name,
      code,
      completed,
      created_by,
      created_at ?? now,
      updated_at ?? now,
    )

    return new Proxy(term, {
      set: (target, prop, value) => {
        target[prop] = value
        target['_updatedAt'] = new Date()
        return true
      },
    })
  }
}
