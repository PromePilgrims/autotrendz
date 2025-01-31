import {
  IChildRepository,
  IRootFolderRepository,
  RootFolder,
} from '@/modules/folder/domain'
import {
  ChildId,
  ChildType,
  Child,
  RootFolderId,
  IChild,
} from '@/modules/folder/domain/entity'
import { AddChild } from '@/modules/folder/domain/use-cases'
import { IFileUploadService } from '@/modules/@shared/domain/contracts'
import { URLValueObject } from '@/modules/@shared/domain/value-object'

import { MockProxy, mock } from 'jest-mock-extended'

jest.mock('nanoid', () => ({
  nanoid: () => '{STATIC_ID}',
}))

jest.useFakeTimers().setSystemTime(new Date())

describe('add-child', () => {
  let rootFolderRepository: MockProxy<IRootFolderRepository>
  let childRepository: MockProxy<IChildRepository>
  let fileUploadService: MockProxy<IFileUploadService>
  let inputFile: AddChild.Input
  let inputSubFolder: AddChild.Input
  let rootFolder: RootFolder
  let childFile: IChild
  let childSubFolder: IChild
  let sut: AddChild

  beforeEach(() => {
    rootFolderRepository = mock()
    childRepository = mock()
    fileUploadService = mock()
    fileUploadService.upload.mockResolvedValue('https://any_url.com')
    inputSubFolder = {
      name: 'any folder name',
      parent_id: 'any_id',
      type: ChildType.SubFolder,
      created_by: 'any_id',
    }
    inputFile = {
      name: 'any file name',
      parent_id: 'any_id',
      type: ChildType.File,
      created_by: 'any_id',
      file: {
        originalname: 'any_name.png',
        mimetype: 'image/png',
        buffer: Buffer.from('any_buffer'),
        size: 500,
      },
    }
    rootFolder = RootFolder.create({
      id: RootFolderId.create(),
      name: 'any folder name',
      created_by: 'any_id',
    })
    childSubFolder = Child.create({
      id: ChildId.create(),
      type: ChildType.SubFolder,
      name: 'any folder name',
      created_by: 'any_id',
    })
    childSubFolder.setParentId(childSubFolder.id)
    childFile = Child.create({
      id: ChildId.create(),
      type: ChildType.File,
      name: 'any file name',
      size: 500,
      mimetype: 'image/png',
      created_by: 'any_id',
    })
    childFile.setParentId(childSubFolder.id)
    childFile.setSrc(URLValueObject.create('https://any_url.com'))
    sut = new AddChild(rootFolderRepository, childRepository, fileUploadService)
  })

  it('should throw if root folder does not exist', async () => {
    rootFolderRepository.findBy.mockResolvedValueOnce(null)

    const result = async () => await sut.exec(inputSubFolder)

    expect(result).rejects.toThrow()
  })

  it('should call save root folder repository if a roots sub folder is being created', async () => {
    rootFolderRepository.findBy.mockResolvedValueOnce(rootFolder)
    inputSubFolder.parent_id = null

    await sut.exec(inputSubFolder)

    expect(rootFolderRepository.save).toHaveBeenCalledWith(rootFolder)
  })

  it('should throw if parent is a file', async () => {
    rootFolderRepository.findBy.mockResolvedValueOnce(rootFolder)
    childRepository.findBy.mockResolvedValueOnce(childFile)
    inputSubFolder.parent_id = childFile.id.toString()

    const result = async () => await sut.exec(inputSubFolder)

    expect(result).rejects.toThrow()
  })

  it('should save child file correctly', async () => {
    rootFolderRepository.findBy.mockResolvedValueOnce(rootFolder)
    childRepository.findBy.mockResolvedValueOnce(childSubFolder)
    inputFile.parent_id = childSubFolder.id.toString()

    await sut.exec(inputFile)

    expect(childRepository.save).toHaveBeenCalledWith(childFile)
  })

  it('should save sub-folder correctly', async () => {
    rootFolderRepository.findBy.mockResolvedValueOnce(rootFolder)
    childRepository.findBy.mockResolvedValueOnce(childSubFolder)
    inputFile.parent_id = childSubFolder.id.toString()

    await sut.exec(inputSubFolder)

    expect(childRepository.save).toHaveBeenCalledWith(childSubFolder)
  })
})
