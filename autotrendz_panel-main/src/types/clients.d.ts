declare namespace App {
  export interface ClientsProps {
    id: string
    name: string
    email: string
    image: string | null
    role: number
    active: boolean
    last_login_at: string
    created_at: string
    updated_at: string
  }
}
