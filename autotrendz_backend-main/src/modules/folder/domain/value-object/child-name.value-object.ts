export class FolderNameValueObject {
  private readonly _value: string

  get value(): string {
    return this._value
  }

  private constructor(value: string) {
    this._value = value
  }

  static create(name: string): FolderNameValueObject {
    if (!name) {
      throw new Error('Folder name is required')
    }

    if (name.length < 3) {
      throw new Error('Folder name must be greater than 3 characters')
    }

    if (name.length > 100) {
      throw new Error('Folder name must be less than 100 characters')
    }

    name = name
      .replace(/:/g, ' ')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s.-]+/g, '')
      .replace(/\s+/g, ' ')

    return new FolderNameValueObject(name)
  }
}
