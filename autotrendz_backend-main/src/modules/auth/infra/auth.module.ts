import {
  ChangePasswordWithRecoveryHash,
  SendRecoveryHash,
} from '@/modules/auth/domain/use-cases'
import { AuthController } from '@/modules/auth/application/controllers'
import { AuthGuard, RolesGuard } from '@/modules/auth/guards'
import { AuthService } from '@/modules/auth/infra'
import { ClientModule } from '@/modules/client/infra'
import { RecoveryHashRepository } from '@/modules/auth/infra/database'
import { RecoveryHashEntity } from '@/modules/auth/infra/database/entity'

import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'

@Global()
@Module({
  imports: [
    ClientModule,
    TypeOrmModule.forFeature([RecoveryHashEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
        }
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: AuthService.name,
      useClass: AuthService,
    },
    {
      provide: RecoveryHashRepository.name,
      useClass: RecoveryHashRepository,
    },
    SendRecoveryHash,
    ChangePasswordWithRecoveryHash,
  ],
  exports: [
    {
      provide: AuthService.name,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
