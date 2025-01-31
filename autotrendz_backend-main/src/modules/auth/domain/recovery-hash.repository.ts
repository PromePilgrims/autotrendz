import { RecoveryHash } from '@/modules/auth/domain/recovery-hash'

export type Where = {
  hash: string
}

export interface IRecoveryHashRepository {
  findOne(where: Where): Promise<RecoveryHash>
  save(recoveryHash: RecoveryHash): Promise<void>
}
