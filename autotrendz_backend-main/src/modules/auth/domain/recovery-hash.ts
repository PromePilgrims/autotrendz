import { HashValueObject } from '@/modules/auth/domain/entity'
import { ClientId } from '@/modules/client/domain'
import { UniqueEntityID } from '@/modules/@shared/domain'

export type RecoveryHashProps = {
  hash?: string
  clientId: string
  expiresAt: Date
  issuedAt?: Date
  used?: boolean
}

export class RecoveryHash {
  private constructor(
    private readonly _hash: HashValueObject,
    private readonly _clientId: ClientId,
    private readonly _expiresAt: Date,
    private readonly _issuedAt: Date,
    private _used: boolean = false,
  ) {}

  get hash(): HashValueObject {
    return this._hash
  }

  get clientId(): ClientId {
    return this._clientId
  }

  get expiresAt(): Date {
    return this._expiresAt
  }

  get issuedAt(): Date {
    return this._issuedAt
  }

  get used(): boolean {
    return this._used
  }

  use(): void {
    this._used = true
  }

  static create({
    hash,
    clientId,
    expiresAt,
    issuedAt,
    used,
  }: RecoveryHashProps): RecoveryHash {
    return new RecoveryHash(
      HashValueObject.create(hash),
      ClientId.create(new UniqueEntityID(clientId)),
      expiresAt,
      issuedAt ?? new Date(),
      used,
    )
  }
}
