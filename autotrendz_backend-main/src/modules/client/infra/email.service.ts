import {
  IEmailService,
  NotifyCredentialsProps,
  NotifyRecoveryHashProps,
} from '@/modules/client/domain'
import { assetsPath } from '@/utils'

import { Resend } from 'resend'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import fs from 'fs'

@Injectable()
export class EmailService implements IEmailService {
  private resend: Resend
  private from: string
  private readonly logger = new Logger(EmailService.name)

  constructor(private readonly configService: ConfigService) {
    this.resend = new Resend(this.configService.get<string>('RESEND_API_KEY'))
    this.from = `"AutoTrendz" <${this.configService.get('EMAIL_USER')}>`
  }

  async notifyCredentials({
    email,
    password,
  }: NotifyCredentialsProps): Promise<void> {
    const html = fs
      .readFileSync(`${assetsPath()}/email/templates/notify-credentials.html`)
      .toString()

    const response = await this.resend.emails.send({
      from: this.from,
      to: email,
      subject: 'You have been registered on AutoTrendz! - Credentials',
      text: `Your password ${password}`,
      html: html
        .replace('{{user_password}}', password)
        .replace('{{email_address}}', email),
    })

    if (response.error) {
      this.logger.error(response.error.message)
      return
    }

    this.logger.log(
      `Credentials sent to: ${email}, message id: ${response.data.id}`,
    )
  }

  async notifyRecoveryHash({
    email,
    hash,
  }: NotifyRecoveryHashProps): Promise<void> {
    const html = fs
      .readFileSync(`${assetsPath()}/email/templates/notify-recovery-hash.html`)
      .toString()

    const response = await this.resend.emails.send({
      from: this.from,
      to: email,
      subject: 'Reset your password - AutoTrendz',
      text: `Reset your password using this link ${hash}`,
      html: html.replace('{{hash}}', hash),
    })

    if (response.error) {
      this.logger.error(response.error.message)
      return
    }

    this.logger.log(
      `Recovery hash sent to: ${email}, message id: ${response.data.id}`,
    )
  }
}
