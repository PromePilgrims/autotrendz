import { PasswordValueObject } from '@/modules/@shared/domain/value-object'
import { IRecoveryHashRepository } from '@/modules/auth/domain'
import { IClientRepository, IEmailService } from '@/modules/client/domain'

import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class ChangePasswordWithRecoveryHash {
  constructor(
    @Inject('RecoveryHashRepository')
    private readonly recoveryHashRepository: IRecoveryHashRepository,
    @Inject('ClientRepository')
    private readonly clientRepository: IClientRepository,
    @Inject('EmailService')
    private readonly emailService: IEmailService,
  ) {}

  async execute({
    hash,
    new_password,
    new_password_confirmation,
  }: ChangePasswordWithRecoveryHash.Input): Promise<void> {
    try {
      const recoveryHash = await this.recoveryHashRepository.findOne({ hash })

      if (!recoveryHash) {
        throw new Error('Incorrect hash')
      }

      if (recoveryHash.used) {
        throw new Error('Hash already used')
      }

      if (recoveryHash.expiresAt < new Date()) {
        throw new Error('Hash has expired')
      }

      if (new_password !== new_password_confirmation) {
        throw new Error('Passwords do not match')
      }

      const client = await this.clientRepository.findOneBy({
        id: recoveryHash.clientId.toString(),
      })

      recoveryHash.use()

      client.changePassword(PasswordValueObject.create(new_password))
      await client.password.encrypt()

      await this.clientRepository.save(client)
      await this.recoveryHashRepository.save(recoveryHash)
    } catch {
      throw new Error(
        'There was an error setting your password. Please try again.',
      )
    }
  }
}

export namespace ChangePasswordWithRecoveryHash {
  export type Input = {
    hash: string
    new_password: string
    new_password_confirmation: string
  }
}
