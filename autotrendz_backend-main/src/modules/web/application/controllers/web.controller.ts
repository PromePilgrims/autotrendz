import { Public } from '@/modules/auth/application/decorators'
import { ContactDTO } from '@/modules/web/application/controllers'
import { EmailService, RecaptchaService } from '@/modules/web/infra'
import { ContactEntity, ContactRepository } from '@/modules/web/infra/database'

import {
  BadRequestException,
  Body,
  Controller,
  Ip,
  Logger,
  Post,
} from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { nanoid } from 'nanoid'

@Controller('web')
export class WebController {
  private readonly logger = new Logger(WebController.name)

  constructor(
    private readonly recaptchaService: RecaptchaService,
    private readonly emailService: EmailService,
    private readonly contactRepository: ContactRepository,
  ) {}

  @Post('contact')
  @Public()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  async notifyContact(
    @Ip() ip: string,
    @Body() { name, email, tel, message, token }: ContactDTO,
  ) {
    try {
      if (!(await this.recaptchaService.validateToken(token, ip))) {
        throw new Error('Invalid recaptcha token')
      }

      const contact = { id: nanoid(), name, email, tel, message, ip }

      await Promise.all([
        this.emailService.notifyContact(contact),
        this.contactRepository.save(ContactEntity.create(contact)),
      ])

      return { message: 'Email sent' }
    } catch (e) {
      this.logger.error(e.message)
      throw new BadRequestException('Could not send message')
    }
  }
}
