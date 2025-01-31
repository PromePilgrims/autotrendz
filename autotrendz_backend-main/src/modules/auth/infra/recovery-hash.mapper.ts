import { RecoveryHash } from '@/modules/auth/domain'
import { RecoveryHashEntity } from '@/modules/auth/infra/database/entity'

export class RecoveryHashMapper {
  static toDomain({
    hash,
    clientId,
    expiresAt,
    issuedAt,
    used,
  }: RecoveryHashEntity) {
    const recoveryHash = RecoveryHash.create({
      hash,
      clientId,
      expiresAt,
      issuedAt,
    })

    if (used) {
      recoveryHash.use()
    }

    return recoveryHash
  }

  static toEntity(recoveryHash: RecoveryHash) {
    const recoveryHashEntity = new RecoveryHashEntity()

    recoveryHashEntity.hash = recoveryHash.hash.value
    recoveryHashEntity.clientId = recoveryHash.clientId.toString()
    recoveryHashEntity.expiresAt = recoveryHash.expiresAt
    recoveryHashEntity.used = recoveryHash.used

    return recoveryHashEntity
  }
}
