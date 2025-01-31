import * as bcrypt from 'bcrypt'

export class PasswordValueObject {
  private constructor(private password: string) {}

  public async compare(plainText: string): Promise<boolean> {
    return await bcrypt.compare(plainText, this.password)
  }

  get value(): string {
    return this.password
  }

  async encrypt(): Promise<void> {
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash
  }

  public static create(password: string): PasswordValueObject {
    if (!password) throw new Error('Password is required')
    if (password.length < 8)
      throw new Error('Password must be at least 8 characters long')

    return new PasswordValueObject(password)
  }
}
