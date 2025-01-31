import {
  ChangePasswordWithRecoveryHash,
  SendRecoveryHash,
} from '@/modules/auth/domain/use-cases'
import {
  RecoveryPasswordDTO,
  ResetPasswordDTO,
  SignInDTO,
} from '@/modules/auth/application/controllers'
import { Public } from '@/modules/auth/application/decorators'
import { AuthService } from '@/modules/auth/infra'

import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  Post,
} from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'

const throttleConfig = {
  default: {
    limit: 1,
    ttl: 3000,
  },
}

@Controller('auth')
@Public()
export class AuthController {
  private readonly logger = new Logger(AuthController.name)

  constructor(
    @Inject('AuthService') private readonly authService: AuthService,
    private readonly sendRecoveryHash: SendRecoveryHash,
    private readonly changePasswordWithRecoveryHash: ChangePasswordWithRecoveryHash,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() input: SignInDTO) {
    return await this.authService.signIn(input)
  }

  @Throttle(throttleConfig)
  @HttpCode(HttpStatus.OK)
  @Post('recovery-password')
  async recoveryPassword(@Body() input: RecoveryPasswordDTO) {
    try {
      await this.sendRecoveryHash.execute(input)
    } catch (error) {
      this.logger.error(error.message)
      throw new BadRequestException(error.message)
    }
  }

  @HttpCode(HttpStatus.OK)
  @Throttle(throttleConfig)
  @Post('reset-password/:hash')
  async resetPassword(
    @Param('hash') hash: string,
    @Body() input: ResetPasswordDTO,
  ) {
    try {
      await this.changePasswordWithRecoveryHash.execute({ ...input, hash })
    } catch (error) {
      this.logger.error(error.message)
      throw new BadRequestException(error.message)
    }
  }
}
