import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { lastValueFrom } from 'rxjs'

@Injectable()
export class RecaptchaService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async validateToken(token: string, ip: string): Promise<boolean> {
    const request = await lastValueFrom(
      this.httpService.post(
        this.configService.get('GOOGLE_RECAPTCHA_URL'),
        {},
        {
          params: {
            secret: this.configService.get('GOOGLE_RECAPTCHA_SECRET_KEY'),
            response: token,
            remoteip: ip,
          },
        },
      ),
    )

    return request.data.success
  }
}
