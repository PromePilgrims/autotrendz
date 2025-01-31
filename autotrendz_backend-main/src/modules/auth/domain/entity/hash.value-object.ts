import crypto from 'crypto'

export class HashValueObject {
  private constructor(private readonly hash: string) {}

  get value(): string {
    return this.hash
  }

  static create(hash?: string): HashValueObject {
    if (!hash) {
      hash = crypto.randomBytes(64).toString('hex')
    }

    return new HashValueObject(hash)
  }
}
