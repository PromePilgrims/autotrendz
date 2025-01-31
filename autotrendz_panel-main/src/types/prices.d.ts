declare namespace App {
  export interface PriceProps {
    id: string
    status: 'completed' | 'running'
    source_file_name: string
    output_file_url: string | null
    triggered_by: string
    triggered_at: strin
    completed_at: string | null
  }
}
