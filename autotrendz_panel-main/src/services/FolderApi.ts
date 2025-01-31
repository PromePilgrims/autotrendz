import { api } from './api'
import axios from 'axios'

class FolderApi {
  public async list() {
    return api.get('/folder')
  }

  public async subFolderList({ folderId }: { folderId: string }) {
    return api.get(`/folder/${folderId}`)
  }

  public async linkClients({
    folderId,
    client_ids
  }: {
    folderId: string
    client_ids: string[]
  }) {
    return api.put(`/folder/${folderId}`, { client_ids })
  }

  public async renameFolder({ folderId, name }: { folderId: string; name: string }) {
    return api.put(`/folder/${folderId}`, { name })
  }

  public async create({ name }: { name: string }) {
    return api.post('/folder', { name })
  }

  public async createSubFolder({
    name,
    parentId
  }: {
    name: string
    parentId: string
  }) {
    return api.post('/folder', {
      name,
      parent_id: parentId
    })
  }

  public async generatePresignedUrl({ key, file }: { key: string; file: File }) {
    return api.post('/folder/upload-presigned-url', { key, content_type: file.type })
  }

  public async putPresignedUrl({
    presigned_url,
    file
  }: {
    presigned_url: string
    file: File
  }) {
    return axios.put(presigned_url, file, {
      headers: { 'Content-Type': file.type }
    })
  }

  public async createFile({
    parent_id,
    name,
    file
  }: {
    parent_id: string
    name: string
    file: File
  }) {
    return api.post(`/folder/${parent_id}/file`, {
      name,
      mimetype: file.type,
      size: file.size
    })
  }
}

export default new FolderApi()
