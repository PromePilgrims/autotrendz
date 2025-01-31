import { EmbedToken } from '@/modules/power-bi/domain/entity'

export interface IPowerBiService {
  getEmbedToken(
    input: IPowerBiService.GetEmbedTokenInput,
  ): Promise<IPowerBiService.GetEmbedTokenOutput>
  isCapacitySuspended(): Promise<IPowerBiService.IsCapacitySuspendedOutput>
  suspendCapacity(): Promise<IPowerBiService.SuspendCapacityOutput>
  resumeCapacity(): Promise<IPowerBiService.ResumeCapacityOutput>
}

export namespace IPowerBiService {
  export type GetEmbedTokenInput = { workspaceId: string; reportId: string }
  export type GetEmbedTokenOutput = EmbedToken

  export type IsCapacitySuspendedOutput = boolean
  export type SuspendCapacityOutput = boolean
  export type ResumeCapacityOutput = boolean
}
