import { ClientRole } from '@/modules/client/domain/entity'

import { Reflector } from '@nestjs/core'

export const Roles = Reflector.createDecorator<ClientRole[]>()
