import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class GetEmbedTokenDTO {
  @IsNotEmpty()
  @IsUUID()
  workspaceId: string

  @IsNotEmpty()
  @IsUUID()
  reportId: string
}

export class RegisterActivityDTO {
  @IsNotEmpty()
  @IsUUID()
  workspaceId: string

  @IsNotEmpty()
  @IsUUID()
  reportId: string

  @IsNotEmpty()
  @IsString()
  userId: string
}
