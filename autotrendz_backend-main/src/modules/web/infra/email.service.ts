import { assetsPath } from '@/utils'

import { Resend } from 'resend'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import fs from 'fs'

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name)
  private resend: Resend
  private from: string
  private to: string

  constructor(private readonly configService: ConfigService) {
    this.resend = new Resend(this.configService.get<string>('RESEND_API_KEY'))
    this.from = `"AutoTrendz" <${this.configService.get('EMAIL_USER')}>`
    this.to = this.configService.get('EMAIL_TO_USER')
  }

  async notifyContact({ name, email, tel, message }: any): Promise<void> {
    const html = fs
      .readFileSync(`${assetsPath()}/email/templates/notify-contact.html`)
      .toString()

    const { from, to } = this

    const response = await this.resend.emails.send({
      from,
      to,
      subject: `Novo Contato de ${name}`,
      text: `${name} - ${email} - ${tel}: ${message}`,
      html: html
        .replace('{{contact_name}}', name)
        .replace('{{contact_email}}', email)
        .replace('{{contact_tel}}', tel)
        .replace('{{contact_message}}', message),
    })

    if (response.data)
      this.logger.log(
        `Contact info sent to: ${to}, message id: ${response.data.id}`,
      )
  }
}
