export class NameValueObject {
  private constructor(private readonly _value: string) {}

  get value() {
    return this._value
  }

  static create(value: string): NameValueObject {
    if (value.length < 2) throw new Error('Name must be at least 2 characters')
    if (value.length > 255)
      throw new Error('Name must be less than 255 characters')

    return new NameValueObject(value.charAt(0).toUpperCase() + value.slice(1))
  }
}
