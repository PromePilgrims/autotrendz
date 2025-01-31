import { Public } from '@/modules/auth/application/decorators'

import { Controller, Get } from '@nestjs/common'

@Controller()
@Public()
export class AppController {
  @Get()
  healthCheck(): any {
    return { status: 'OK' }
  }
}
