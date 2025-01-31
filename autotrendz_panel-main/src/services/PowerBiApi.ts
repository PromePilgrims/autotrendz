import { api } from '@/services/api'

class PowerBiApi {
  async embedToken(input: { workspaceId: string; reportId: string }) {
    return api.post('/power-bi/embed-token', input)
  }

  async registerActivity(input: {
    workspaceId: string
    reportId: string
    userId: string
  }) {
    return api.post('/power-bi/register-activity', input)
  }
}

export default new PowerBiApi()
