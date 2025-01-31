import { IPowerBiService } from '@/modules/power-bi/domain'

import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class CapacityReady {
  constructor(
    @Inject('PowerBiService') private readonly powerBiService: IPowerBiService,
  ) {}

  async exec(): Promise<CapacityReady.Output> {
    try {
      const isSuspended = await this.powerBiService.isCapacitySuspended()
      return { active: !isSuspended }
    } catch {
      throw new Error('Could not check capacity status')
    }
  }
}

export namespace CapacityReady {
  export type Output = {
    active: boolean
  }
}
