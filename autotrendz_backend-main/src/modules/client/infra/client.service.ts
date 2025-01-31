import {
  Client,
  IClientRepository,
  IClientService,
} from '@/modules/client/domain'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class ClientService implements IClientService {
  constructor(
    @Inject('ClientRepository')
    private readonly clientRepository: IClientRepository,
  ) {}

  async findByEmail({
    email,
  }: IClientService.FindByEmailInput): Promise<IClientService.FindByEmailOutput> {
    const client = await this.clientRepository.findOneBy({ email })
    return client
  }

  async registerLogin(client: Client): Promise<void> {
    client.justLoggedIn()
    await this.clientRepository.save(client)
  }
}
