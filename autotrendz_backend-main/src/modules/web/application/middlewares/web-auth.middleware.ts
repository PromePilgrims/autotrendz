import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { Request, NextFunction } from 'express'

@Injectable()
export class WebAuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, _: any, next: NextFunction) {
    const token = req.headers['x-auth-token']
    if (token !== this.configService.get('WEB_AUTH_TOKEN')) {
      throw new UnauthorizedException('Invalid token')
    }
    next()
  }
}
