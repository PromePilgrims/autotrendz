const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export class EmailValueObject {
  private constructor(private readonly _value: string) {}

  get value() {
    return this._value
  }

  static create(value: string): EmailValueObject {
    if (EMAIL_REGEX.test(value) === false) throw new Error('Invalid email')
    return new EmailValueObject(value.toLowerCase())
  }
}
