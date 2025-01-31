export class ImageValueObject {
  private constructor(private readonly _value: string) {}

  get value() {
    return this._value
  }

  static create(value: string): ImageValueObject {
    return new ImageValueObject(value)
  }
}
