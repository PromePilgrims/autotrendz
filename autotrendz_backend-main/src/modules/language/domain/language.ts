import { LanguageId } from '@/modules/language/domain/entity'
import { slugify } from '@/utils'

export type LanguaProps = {
  id: LanguageId
  name: string
  code: string
  active?: boolean
  created_by: string
  created_at?: Date
  updated_at?: Date
}

export class Language {
  private constructor(
    private readonly _id: LanguageId,
    private _name: string,
    private _code: string,
    private _active: boolean = true,
    private readonly _createdBy: string,
    private readonly _createdAt: Date,
    private _updatedAt: Date,
  ) {}

  get id(): LanguageId {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get code(): string {
    return this._code
  }

  get isActive(): boolean {
    return this._active
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
    this._code = slugify(code)
  }

  activate(): void {
    this._active = true
  }

  deactivate(): void {
    this._active = false
  }

  public static create({
    id,
    name,
    code,
    active,
    created_by,
    created_at,
    updated_at,
  }: LanguaProps): Language {
    const now = new Date()

    const language = new Language(
      id,
      name,
      slugify(code),
      active,
      created_by,
      created_at ?? now,
      updated_at ?? now,
    )

    return new Proxy(language, {
      set: (target, prop, value) => {
        target[prop] = value
        target['_updatedAt'] = new Date()
        return true
      },
    })
  }
}
