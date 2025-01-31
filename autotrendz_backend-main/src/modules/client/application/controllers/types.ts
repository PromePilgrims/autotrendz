import { Client } from '@/modules/client/domain'
import { ClientRole } from '@/modules/client/domain/entity'

import { Transform } from 'class-transformer'
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
  Length,
} from 'class-validator'

export class CreateClientDTO {
  @IsNotEmpty()
  @Length(3, 255)
  name: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string
}

export class UpdateClientDTO {
  @IsOptional()
  @Length(3, 255)
  name?: string

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  active?: boolean

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsEnum(ClientRole)
  role?: ClientRole
}

export class ClientDTO {
  private constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly email: string,
    private readonly image: string,
    private readonly role: ClientRole,
    private readonly active: boolean,
    private readonly created_at: Date,
    private readonly updated_at: Date,
    private readonly last_login_at?: Date,
  ) {}

  static fromAggregate(aggregate: Client): ClientDTO {
    return new ClientDTO(
      aggregate.id.toString(),
      aggregate.name.value,
      aggregate.email.value,
      aggregate.image.value,
      aggregate.role,
      aggregate.isActive,
      aggregate.createdAt,
      aggregate.updatedAt,
      aggregate.lastLoginAt,
    )
  }
}
