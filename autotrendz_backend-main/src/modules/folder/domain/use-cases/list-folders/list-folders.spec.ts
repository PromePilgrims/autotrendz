import { UniqueEntityID } from '@/modules/@shared/domain'
import { IRootFolderRepository, RootFolder } from '@/modules/folder/domain'
import { RootFolderId } from '@/modules/folder/domain/entity'
import { ListRootFolders } from '@/modules/folder/domain/use-cases'
import { MockProxy, mock } from 'jest-mock-extended'

describe('ListRootFolders', () => {
  let rootFolderRepository: MockProxy<IRootFolderRepository>
  let rootFolder: RootFolder
  let sut: ListRootFolders

  beforeEach(() => {
    rootFolderRepository = mock()
    rootFolder = RootFolder.create({
      id: RootFolderId.create(new UniqueEntityID()),
      name: 'Root Folder',
      created_by: 'user_id',
    })
    sut = new ListRootFolders(rootFolderRepository)
  })

  it('should return the root folders correctly', async () => {
    rootFolderRepository.findAll.mockResolvedValueOnce([rootFolder, rootFolder])

    const result = await sut.exec()

    expect(result).toEqual([rootFolder, rootFolder])
    expect(rootFolderRepository.findAll).toHaveBeenCalled()
  })

  it('should throw if findAll throws', async () => {
    rootFolderRepository.findAll.mockRejectedValueOnce(null)

    const result = async () => sut.exec()

    expect(result).rejects.toThrow('Could not list root folders')
    expect(rootFolderRepository.findAll).toHaveBeenCalledWith()
  })
})
