import { UniqueEntityID } from '@/modules/@shared/domain'
import { URLValueObject } from '@/modules/@shared/domain/value-object'
import { RootFolder } from '@/modules/folder/domain'
import {
  ChildId,
  RootFolderId,
  IChild,
  Child,
  ChildType,
} from '@/modules/folder/domain/entity'
import { ChildNameValueObject } from '@/modules/folder/domain/value-object'

describe('root-folder', () => {
  let rootFolder: RootFolder
  let childFolder: IChild
  let childFile: IChild

  beforeEach(() => {
    rootFolder = RootFolder.create({
      id: RootFolderId.create(new UniqueEntityID('root-folder-id')),
      name: 'root-folder',
      created_by: 'user-id',
    })

    childFolder = Child.create({
      id: ChildId.create(new UniqueEntityID('child-id')),
      type: ChildType.SubFolder,
      name: 'child-folder',
      created_by: 'user-id',
    })

    childFile = Child.create({
      id: ChildId.create(new UniqueEntityID('file-id')),
      type: ChildType.File,
      name: 'arquivo.mp4',
      mimetype: 'video/mp4',
      size: 5000,
      created_by: 'user-id',
    })
    childFile.setSrc(URLValueObject.create('https://any_url.com'))
  })

  it('should create a root folder correctly', () => {
    expect(rootFolder.id.toString()).toBe('root-folder-id')
    expect(rootFolder.children).toHaveLength(0)
  })

  it('should throw if child already exists', () => {
    const result = () => {
      rootFolder.addChild(childFolder)
      rootFolder.addChild(childFolder)
    }

    expect(result).toThrow('Child already exists')
  })

  it('should add a child correctly', () => {
    rootFolder.addChild(childFolder)

    expect(rootFolder.children).toHaveLength(1)
    expect(rootFolder.children[0].id.toString()).toBe('child-id')
  })

  it('should add a file to a child correctly', () => {
    rootFolder.addChild(childFolder)
    childFolder.addChild(childFile)

    expect(rootFolder.children).toHaveLength(1)
    expect(rootFolder.children[0].children).toHaveLength(1)
    expect(rootFolder.children[0].children[0].id.toString()).toBe('file-id')
  })

  it('should update a child correctly', () => {
    rootFolder.addChild(childFolder)

    childFolder.changeName(ChildNameValueObject.create('updated-child-folder'))

    rootFolder.updateChild(childFolder)

    expect(rootFolder.children).toHaveLength(1)
    expect(rootFolder.children[0].name).toBe('updated-child-folder')
  })

  it('should remove a child correctly', () => {
    rootFolder.addChild(childFolder)
    rootFolder.removeChild(childFolder.id)

    expect(rootFolder.children).toHaveLength(0)
  })

  it('should not remove a child if it does not exist', () => {
    expect(rootFolder.children).toHaveLength(0)

    rootFolder.removeChild(childFolder.id)

    expect(rootFolder.children).toHaveLength(0)
  })
})
