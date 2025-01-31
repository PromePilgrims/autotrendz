import {
  AddFile,
  AddFolder,
  ListFolder,
  ListFolders,
  UpdateFile,
  UpdateFolder,
} from '@/modules/folder/domain/use-cases'
import {
  FolderDTO,
  CreateFolderDTO,
  UpdateFolderDTO,
  CreateFileDTO,
  UpdateFileDTO,
  GetUploadPresignedUrlDTO,
} from '@/modules/folder/application/controllers'
import { ClientRole } from '@/modules/client/domain/entity'
import { Roles } from '@/modules/auth/decorators'

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Request,
  Put,
  Inject,
} from '@nestjs/common'
import { IGetUploadPresignedUrlService } from '@/modules/@shared/domain/contracts'

@Controller('folder')
export class FolderController {
  private readonly logger = new Logger(FolderController.name)

  constructor(
    private readonly addFolder: AddFolder,
    private readonly listFolder: ListFolder,
    private readonly listFolders: ListFolders,
    private readonly updateFolder: UpdateFolder,
    private readonly addFile: AddFile,
    private readonly updateFile: UpdateFile,

    @Inject('FileService')
    private readonly fileService: IGetUploadPresignedUrlService,
  ) {}

  @Get()
  async listFoldersHandler(@Request() { user }: any) {
    try {
      const folders = await this.listFolders.exec({ user })
      return folders.map((folder) => FolderDTO.fromAggregate(folder))
    } catch (error) {
      this.logger.error(error)
      throw new BadRequestException()
    }
  }

  @Get(':id')
  async listFolderHandler(@Request() { user }: any, @Param('id') id: string) {
    try {
      const rootFolder = await this.listFolder.exec({ user, id })
      return FolderDTO.fromAggregate(rootFolder)
    } catch (error) {
      this.logger.error(error)
      throw new BadRequestException()
    }
  }

  @Post('upload-presigned-url')
  async UploadPresignedUrlHandler(@Body() input: GetUploadPresignedUrlDTO) {
    try {
      const presigned_url = await this.fileService.getUploadPresignedUrl(input)
      return {
        presigned_url,
      }
    } catch (error) {
      this.logger.error(error)
      throw new BadRequestException()
    }
  }

  @Roles([ClientRole.ADMIN])
  @Put(':id')
  async updateFolderHandler(
    @Param('id') id: string,
    @Body() { name, client_ids }: UpdateFolderDTO,
  ) {
    try {
      const folder = await this.updateFolder.exec({ id, name, client_ids })
      return FolderDTO.fromAggregate(folder)
    } catch (error) {
      this.logger.error(error)
      throw new BadRequestException()
    }
  }

  @Roles([ClientRole.ADMIN])
  @Post()
  async addFolderHandler(
    @Request() { user }: any,
    @Body() { parent_id, name }: CreateFolderDTO,
  ) {
    try {
      const folder = await this.addFolder.exec({
        parent_id,
        name,
        created_by: user.sub,
      })
      return FolderDTO.fromAggregate(folder)
    } catch (error) {
      this.logger.error(error)
      throw new BadRequestException()
    }
  }

  @Roles([ClientRole.ADMIN])
  @Post(':parent_id/file')
  async addFileHandler(
    @Request() { user }: any,
    @Param('parent_id') parent_id: string,
    @Body() { name, mimetype, size }: CreateFileDTO,
  ) {
    try {
      const newFile = await this.addFile.exec({
        parent_id,
        name,
        created_by: user.sub,
        mimetype,
        size,
      })
      return FolderDTO.fromAggregate(newFile)
    } catch (error) {
      this.logger.error(error)
      throw new BadRequestException()
    }
  }

  @Roles([ClientRole.ADMIN])
  @Put(':parent_id/:file_id')
  async updateFileHandler(
    @Param('parent_id') parent_id: string,
    @Param('file_id') id: string,
    @Body() { name }: UpdateFileDTO,
  ) {
    try {
      const folder = await this.updateFile.exec({
        id,
        parent_id,
        name,
      })
      return FolderDTO.fromAggregate(folder)
    } catch (error) {
      this.logger.error(error)
      throw new BadRequestException()
    }
  }
}
