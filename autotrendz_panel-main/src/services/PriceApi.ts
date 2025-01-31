import { api } from './api'

class PriceApi {
  public async list() {
    return api.get('/audatex')
  }

  public async file(file: File) {
    const fd = new FormData()
    fd.append('file', file)

    return api.post('/audatex', fd)
  }
}

export default new PriceApi()
