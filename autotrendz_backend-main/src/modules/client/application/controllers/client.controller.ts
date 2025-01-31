import { ClientRole } from '@/modules/client/domain/entity'
import {
  ClientDTO,
  CreateClientDTO,
  UpdateClientDTO,
} from '@/modules/client/application/controllers'
import {
  CreateClient,
  DeleteClient,
  ListClient,
  ListClients,
  UpdateClient,
} from '@/modules/client/domain/use-cases'
import { makeImageValidators } from '@/modules/@shared/application/factories'
import { Roles } from '@/modules/auth/decorators'

import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Param,
  ParseFilePipe,
  Get,
  Post,
  Request,
  Put,
  UploadedFile,
  UseInterceptors,
  Delete,
  //Inject,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
// import { IFileGetService } from '@/modules/@shared/domain/contracts'
// import { Public } from '@/modules/auth/application/decorators'

@Controller('clients')
export class ClientController {
  constructor(
    private readonly createClientUseCase: CreateClient,
    private readonly updateClientUseCase: UpdateClient,
    private readonly listClientsUseCase: ListClients,
    private readonly listClientUseCase: ListClient,
    private readonly deleteClientUseCase: DeleteClient,
  ) {}

  private readonly logger = new Logger(ClientController.name)

  @Roles([ClientRole.ADMIN])
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Request() { user }: any,
    @Body() input: CreateClientDTO,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: makeImageValidators(),
      }),
    )
    imageFile: any,
  ): Promise<ClientDTO> {
    try {
      const client = await this.createClientUseCase.exec({
        ...input,
        imageFile,
        created_by: user.sub,
      })
      return ClientDTO.fromAggregate(client)
    } catch (error) {
      this.logger.error(error)
      throw new BadRequestException(error.message)
    }
  }

  @Roles([ClientRole.ADMIN])
  @Get()
  async listAll(): Promise<ClientDTO[]> {
    try {
      const clients = await this.listClientsUseCase.exec()

      return clients.map((client) => ClientDTO.fromAggregate(client))
    } catch (error) {
      this.logger.error(error)
      throw new BadRequestException(error.message)
    }
  }

  @Get('me')
  async me(@Request() { user }: any): Promise<ClientDTO> {
    try {
      const client = await this.listClientUseCase.exec({ id: user.sub })
      return ClientDTO.fromAggregate(client)
    } catch (error) {
      this.logger.error(error)
      throw new BadRequestException(error.message)
    }
  }

  @Roles([ClientRole.ADMIN])
  @Get(':id')
  async list(@Param() { id }: any): Promise<ClientDTO> {
    try {
      const client = await this.listClientUseCase.exec({ id })
      return ClientDTO.fromAggregate(client)
    } catch (error) {
      this.logger.error(error)
      throw new BadRequestException(error.message)
    }
  }

  @Roles([ClientRole.ADMIN])
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param() { id }: any,
    @Body() input: UpdateClientDTO,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: makeImageValidators(),
      }),
    )
    image: any,
  ): Promise<ClientDTO> {
    try {
      const client = await this.updateClientUseCase.exec({
        id,
        ...input,
        image,
      })
      return ClientDTO.fromAggregate(client)
    } catch (error) {
      this.logger.error(error)
      throw new BadRequestException(error.message)
    }
  }

  @Roles([ClientRole.ADMIN])
  @Delete(':id')
  async delete(
    @Request() { user }: any,
    @Param() { id }: any,
  ): Promise<ClientDTO> {
    try {
      if (user.sub === id) {
        throw new Error('You cannot delete yourself')
      }

      const client = await this.deleteClientUseCase.exec({ id })
      return ClientDTO.fromAggregate(client)
    } catch (error) {
      this.logger.error(error)
      throw new BadRequestException(error.message)
    }
  }
}
