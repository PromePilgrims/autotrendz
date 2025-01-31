import { api } from './api'

interface CreateProps {
  client_ids: string[]
  name: string
  workspace_id: string
  report_id: string
}

class ReportApi {
  public async list() {
    return api.get('/reports')
  }

  public async create(data: CreateProps) {
    return api.post('/reports', data)
  }

  public async edit({
    name,
    workspace_id,
    report_id,
    id,
    client_ids
  }: {
    name: string
    workspace_id: string
    report_id: string
    id: string
    client_ids: [{ id: string }]
  }) {
    return api.put(`/reports/${id}`, {
      name,
      workspace_id,
      report_id,
      id,
      client_ids
    })
  }

  public async delete({ id }: { id: string }) {
    return api.delete(`reports/${id}`)
  }
}

export default new ReportApi()
