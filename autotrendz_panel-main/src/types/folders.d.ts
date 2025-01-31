declare namespace App {
  export interface FoldersProps {
    id: string
    name: string
    parent_id: string | null
    sub_folders: FoldersProps[]
    files: [
      {
        id: string
        parent_id: string
        name: string
        src: string
        mimetype: string
        size: number
      }
    ]
    clients: [
      {
        id: string
        name: string
      }
    ]
  }
}
