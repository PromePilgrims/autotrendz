import { api } from './api'

class AuthApi {
  public async login({ email, password }: { email: string; password: string }) {
    return api.post('/auth/signin', { email, password })
  }

  public async sendEmail({ email }: { email: string }) {
    return api.post('/auth/recovery-password', { email })
  }

  public async recovery({
    password,
    confirmPassword,
    hash
  }: {
    password: string
    confirmPassword: string
    hash: string
  }) {
    return api.post(`/auth/reset-password/${hash}`, {
      new_password: password,
      new_password_confirmation: confirmPassword
    })
  }
}

export default new AuthApi()
