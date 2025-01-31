import { ContactEntity } from '@/modules/web/infra/database'

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class ContactRepository {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly repository: Repository<ContactEntity>,
  ) {}

  async save(data: ContactEntity): Promise<void> {
    await this.repository.save(data)
  }
}
