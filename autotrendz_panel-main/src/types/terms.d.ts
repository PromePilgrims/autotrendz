declare namespace App {
  export interface TermsProps {
    id: string
    name: string
    section: string
    code: string
    completed: boolean
    translations: [{ id: string; translation: string; language: string }]
    created_by: string
    created_at: string
    updated_at: string
  }
}
