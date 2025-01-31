import { api } from './api'

class TermApi {
  public async list() {
    return api.get('/i18n/terms')
  }

  public async create({
    name,
    code,
    section
  }: {
    name: string
    code: string
    section: string
  }) {
    return api.post('/i18n/terms', { name, code, section })
  }

  public async manage({
    data,
    id
  }: {
    data: [{ translation: string; language_id: string }]
    id: string
  }) {
    return api.put(`/i18n/terms/${id}`, {
      translations: data
    })
  }
}

export default new TermApi()
