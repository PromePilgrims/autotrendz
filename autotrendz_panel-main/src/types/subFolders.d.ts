declare namespace App {
  export interface SubFoldersProps {
    id: string
    name: string
    children: [
      {
        id: string
        parent_id: string | null
        name: string
        type: string
        clients: [{ id: string; name: string }]
        src?: string
        mimetype?: string
        size?: number
      }
    ]
    clients: [{ id: string; name: string }]
  }
}
