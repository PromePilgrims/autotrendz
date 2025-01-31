import {
  Folder,
  FolderOwnWhere,
  FolderWhere,
  IFolderRepository,
} from '@/modules/folder/domain'
import { FolderMapper } from '@/modules/folder/infra'
import { FolderEntity } from '@/modules/folder/infra/database/entity'

import { InjectRepository } from '@nestjs/typeorm'
import { In, IsNull, Repository } from 'typeorm'

export class FolderRepository implements IFolderRepository {
  constructor(
    @InjectRepository(FolderEntity)
    private folderRepo: Repository<FolderEntity>,
  ) {}

  async save(folder: Folder): Promise<void> {
    await this.folderRepo.save(FolderMapper.toEntity(folder))
  }

  async findBy(where: FolderWhere): Promise<Folder> {
    if (
      Object.values(where).every(
        (cond) => !cond || cond === null || cond === '',
      )
    ) {
      return null
    }

    const folder = await this.folderRepo.findOne({
      select: {
        clients: { id: true, name: true },
      },
      where,
      relations: ['clients', 'sub_folders', 'files'],
    })
    return folder ? FolderMapper.toDomain(folder) : null
  }

  async findOwnBy({ id, client_id }: FolderOwnWhere): Promise<Folder> {
    if (!id || !client_id) {
      return null
    }

    const folder = await this.folderRepo.findOne({
      select: {
        clients: { id: true, name: true },
      },
      where: {
        id,
        clients: { id: In([client_id]) },
      },
      relations: ['clients', 'sub_folders', 'files'],
    })

    return folder ? FolderMapper.toDomain(folder) : null
  }

  async findAll({ client_id }: FolderOwnWhere): Promise<Folder[]> {
    const folders = await this.folderRepo.find({
      select: {
        clients: { id: true, name: true },
      },
      where: {
        parent_id: IsNull(),
        clients: client_id ? { id: In([client_id]) } : undefined,
      },
      order: {
        name: 'ASC',
      },
      relations: ['clients'],
    })
    return folders.map((folder) => FolderMapper.toDomain(folder))
  }
}
