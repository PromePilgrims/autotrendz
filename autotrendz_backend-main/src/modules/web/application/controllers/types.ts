import { IsEmail, IsNotEmpty, Length } from 'class-validator'

export class ContactDTO {
  @Length(3, 255)
  name: string

  @IsEmail()
  email: string

  @IsNotEmpty()
  tel: string

  @IsNotEmpty()
  message: string

  @IsNotEmpty()
  token: string
}
