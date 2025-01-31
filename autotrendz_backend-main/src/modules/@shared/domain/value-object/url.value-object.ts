export class URLValueObject {
  private readonly _value: string

  get value(): string {
    return this._value
  }

  private constructor(value: string) {
    this._value = value
  }

  static create(url: string): URLValueObject {
    if (!url) {
      throw new Error('URL is required')
    }

    return new URLValueObject(encodeURI(url))
  }
}
