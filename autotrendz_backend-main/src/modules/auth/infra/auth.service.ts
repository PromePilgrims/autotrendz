import { User } from '@/modules/auth/domain'
import { IClientService } from '@/modules/client/domain'
import { ClientRole } from '@/modules/client/domain/entity'

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    @Inject('ClientService') private readonly clientService: IClientService,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }: Login.Input) {
    const client = await this.clientService.findByEmail({ email })

    if (!client) {
      throw new UnauthorizedException()
    }

    if (!client.isActive) {
      throw new UnauthorizedException()
    }

    const isPasswordValid = await client.password.compare(password)

    if (!isPasswordValid) {
      throw new UnauthorizedException()
    }

    await this.clientService.registerLogin(client)

    const payload: User = {
      sub: client.id.toString(),
      name: client.name.value,
      role: client.role,
    }

    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  hasAdminRole(user: User) {
    return user.role === ClientRole.ADMIN
  }
}

export namespace Login {
  export type Input = {
    email: string
    password: string
  }

  export type Output = { access_token: string }
}
