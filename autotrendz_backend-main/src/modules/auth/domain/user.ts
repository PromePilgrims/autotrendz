import { ClientRole } from '@/modules/client/domain/entity'

export type User = {
  sub: string
  name: string
  role: ClientRole
  iat?: number
  exp?: number
}
