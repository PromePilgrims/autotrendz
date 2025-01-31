import { Identifier } from '@/modules/@shared/domain'

import { nanoid } from 'nanoid'

export class UniqueEntityID extends Identifier<string> {
  constructor(id?: string) {
    super(id ? id : nanoid())
  }
}
