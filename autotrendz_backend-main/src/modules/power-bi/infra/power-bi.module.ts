import {
  GetEmbedToken,
  SuspendCapacity,
  ResumeCapacity,
  CheckCapacity,
  RegisterActivity,
  CapacityReady,
} from '@/modules/power-bi/domain/use-cases'
import { PowerBiController } from '@/modules/power-bi/application/controllers'
import { PowerBiService } from '@/modules/power-bi/infra/services'
import { PowerBiRepository } from '@/modules/power-bi/infra/database'
import { ActivityHistory } from '@/modules/power-bi/infra/database/entities'
import { CheckCapacityCron } from '@/modules/power-bi/application/crons'

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([ActivityHistory])],
  controllers: [PowerBiController],
  providers: [
    {
      provide: PowerBiRepository.name,
      useClass: PowerBiRepository,
    },
    {
      provide: PowerBiService.name,
      useClass: PowerBiService,
    },
    GetEmbedToken,
    SuspendCapacity,
    ResumeCapacity,
    CheckCapacity,
    RegisterActivity,
    CapacityReady,
    CheckCapacityCron,
  ],
  exports: [],
})
export class PowerBiModule {}
