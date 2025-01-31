import { Roles } from '@/modules/auth/decorators'
import { User } from '@/modules/auth/domain'
import { ClientRole } from '@/modules/client/domain/entity'

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler())
    if (!roles) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const user = request.user as User
    return this.matchRoles(roles, user.role)
  }

  private matchRoles(roles: ClientRole[], userRole: ClientRole): boolean {
    return roles.some((role) => role === userRole)
  }
}
