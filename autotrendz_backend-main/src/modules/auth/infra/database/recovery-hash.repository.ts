import {
  IRecoveryHashRepository,
  RecoveryHash,
  Where,
} from '@/modules/auth/domain'
import { RecoveryHashMapper } from '@/modules/auth/infra'
import { RecoveryHashEntity } from '@/modules/auth/infra/database/entity'

import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

export class RecoveryHashRepository implements IRecoveryHashRepository {
  constructor(
    @InjectRepository(RecoveryHashEntity)
    private recoveryHashRepo: Repository<RecoveryHashEntity>,
  ) {}

  async findOne({ hash }: Where): Promise<RecoveryHash> {
    const recoveryHash = await this.recoveryHashRepo.findOne({
      where: { hash },
    })
    return recoveryHash ? RecoveryHashMapper.toDomain(recoveryHash) : null
  }

  async save(recoveryHash: RecoveryHash): Promise<void> {
    await this.recoveryHashRepo.save(RecoveryHashMapper.toEntity(recoveryHash))
  }
}
