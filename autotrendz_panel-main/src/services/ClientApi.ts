import { api } from './api'

class ClientApi {
  public async list() {
    return api.get('/clients')
  }

  public async edit({
    name,
    email,
    role,
    active,
    image,
    id
  }: {
    name: string
    email: string
    role: number
    active: boolean
    id: string
    image?: File
  }) {
    const fd = new FormData()

    fd.append('name', name)
    fd.append('email', email)
    fd.append('role', role.toString())
    fd.append('active', String(active))
    if (image) {
      fd.append('image', image)
    }

    return api.put(`/clients/${id}`, fd)
  }

  public async delete({ id }: { id: string }) {
    return api.delete(`clients/${id}`)
  }
}

export default new ClientApi()
