declare namespace App {
  export interface ReportProps {
    id: string
    name: string
    workspace_id: string
    report_id: string
    created_by: string
    created_at: string
    updated_at: string
    clients: [{ id: string; name: string }]
  }
}
