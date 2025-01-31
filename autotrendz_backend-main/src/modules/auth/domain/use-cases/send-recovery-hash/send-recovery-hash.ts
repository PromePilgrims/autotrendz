import { IRecoveryHashRepository, RecoveryHash } from '@/modules/auth/domain'
import { IClientRepository, IEmailService } from '@/modules/client/domain'

import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class SendRecoveryHash {
  constructor(
    @Inject('RecoveryHashRepository')
    private readonly recoveryHashRepository: IRecoveryHashRepository,
    @Inject('ClientRepository')
    private readonly clientRepository: IClientRepository,
    @Inject('EmailService')
    private readonly emailService: IEmailService,
  ) {}

  async execute({ email }: SendRecoveryHash.Input): Promise<void> {
    try {
      const client = await this.clientRepository.findOneBy({ email })

      if (!client) {
        throw new Error('Client not found')
      }

      const recoveryHash = RecoveryHash.create({
        clientId: client.id.toString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })

      this.emailService.notifyRecoveryHash({
        email: client.email.value,
        hash: recoveryHash.hash.value,
      })

      await this.recoveryHashRepository.save(recoveryHash)
    } catch {
      throw new Error(
        'There was an error recovering your password. Please try again.',
      )
    }
  }
}

export namespace SendRecoveryHash {
  export type Input = {
    email: string
  }
}
