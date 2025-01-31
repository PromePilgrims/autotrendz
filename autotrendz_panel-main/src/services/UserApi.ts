import { api } from './api'

class UserApi {
  public async create({
    name,
    email,
    password,
    image
  }: {
    name: string
    email: string
    password: string
    image?: File
  }) {
    const fd = new FormData()

    fd.append('name', name)
    fd.append('email', email)
    fd.append('password', password)
    if (image) {
      fd.append('image', image)
    }

    return api.post('/clients', fd)
  }

  public async me() {
    return api.get('/clients/me')
  }
}

export default new UserApi()
