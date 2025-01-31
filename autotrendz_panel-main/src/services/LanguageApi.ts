import { api } from './api'

class LanguageApi {
  public async list() {
    return api.get('/i18n/languages')
  }

  public async create({ name, code }: { name: string; code: string }) {
    return api.post('/i18n/languages', { name, code })
  }

  public async edit({
    name,
    code,
    active,
    id
  }: {
    name: string
    code: string
    active: boolean
    id: string
  }) {
    return api.put(`/i18n/languages/${id}`, { name, code, active })
  }
}

export default new LanguageApi()
