import { IsEmail, IsStrongPassword, Length } from 'class-validator'

export class SignInDTO {
  @IsEmail()
  email: string

  @Length(6)
  password: string
}

export class RecoveryPasswordDTO {
  @IsEmail()
  email: string
}

export class ResetPasswordDTO {
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  new_password: string

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  new_password_confirmation: string
}
