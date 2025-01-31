declare namespace App {
  export interface UserProps {
    id: string
    name: string
    email: string
    image: string | null
    active: boolean
    last_login_at: string
    created_at: string
    updated_at: string
  }
}
