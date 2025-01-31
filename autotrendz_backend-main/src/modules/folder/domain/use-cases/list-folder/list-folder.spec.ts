import { UniqueEntityID } from '@/modules/@shared/domain'
import { IRootFolderRepository, RootFolder } from '@/modules/folder/domain'
import { RootFolderId } from '@/modules/folder/domain/entity'
import { ListRootFolder } from '@/modules/folder/domain/use-cases'
import { MockProxy, mock } from 'jest-mock-extended'

describe('ListRootFolder', () => {
  let rootFolderRepository: MockProxy<IRootFolderRepository>
  let rootFolderId: string
  let sut: ListRootFolder

  beforeEach(() => {
    rootFolderId = 'root_folder_id'
    rootFolderRepository = mock()
    sut = new ListRootFolder(rootFolderRepository)
  })

  it('should return the root folder correctly', async () => {
    const rootFolder = RootFolder.create({
      id: RootFolderId.create(new UniqueEntityID(rootFolderId)),
      name: 'Root Folder',
      created_by: 'user_id',
    })
    rootFolderRepository.findBy.mockResolvedValueOnce(rootFolder)

    const result = await sut.exec({ id: rootFolderId })

    expect(result).toEqual(rootFolder)
    expect(rootFolderRepository.findBy).toHaveBeenCalledWith({
      id: rootFolderId,
    })
  })

  it('should throw if findBy throws', async () => {
    rootFolderRepository.findBy.mockRejectedValueOnce(null)

    const result = async () => sut.exec({ id: rootFolderId })

    expect(result).rejects.toThrow('Could not list root folders')
    expect(rootFolderRepository.findBy).toHaveBeenCalledWith({
      id: rootFolderId,
    })
  })
})
