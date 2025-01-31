import { IFileUploadService } from '@/modules/@shared/domain/contracts'
import {
  Client,
  IClientRepository,
  IEmailService,
} from '@/modules/client/domain'
import { CreateClient } from '@/modules/client/domain/use-cases'

import { MockProxy, mock } from 'jest-mock-extended'

jest.mock('nanoid', () => {
  return {
    nanoid: () => '{RANDOM_CLIENT_ID}',
  }
})

describe('create-client', () => {
  let clientRepository: MockProxy<IClientRepository>
  let fileUploadService: MockProxy<IFileUploadService>
  let emailService: MockProxy<IEmailService>
  let email: string
  let password: string
  let name: string
  let image: string
  let imageFile: {
    originalname: string
    buffer: Buffer
    mimetype: string
    size: number
  }
  let created_by: string
  let input: CreateClient.Input
  let sut: CreateClient

  beforeEach(() => {
    clientRepository = mock()
    fileUploadService = mock()
    emailService = mock()
    email = 'any-emai@any-domain.com'
    password = 'any_password_123'
    name = 'Any-name'
    imageFile = {
      originalname: 'any_name',
      buffer: Buffer.from('any-buffer'),
      mimetype: 'image/png',
      size: 1,
    }
    image = 'any-image'
    created_by = 'any-created_by'
    input = { email, name, password, imageFile, created_by }
    sut = new CreateClient(clientRepository, fileUploadService, emailService)
  })

  it('should throw if client already exists', async () => {
    clientRepository.findOneBy.mockResolvedValueOnce({} as any)

    const result = async () => {
      await sut.exec(input)
    }

    expect(result).rejects.toThrow(new Error('Client already exists'))
  })

  it('should call fileUploadService with correct params', async () => {
    const result = await sut.exec(input)

    expect(result).toBeInstanceOf(Client)
    expect(fileUploadService.upload).toHaveBeenCalledWith({
      fileName: `clients/images/any-name-{RANDOM_CLIENT_ID}.png`,
      buffer: imageFile.buffer,
    })
  })

  it('should call save on clientRepository with correct params', async () => {
    const client = await sut.exec(input)

    expect(clientRepository.save).toHaveBeenCalledWith(client)
  })

  it('should throw if clientRepository throws', async () => {
    clientRepository.save.mockRejectedValueOnce(new Error('any-error'))

    const result = async () => {
      await sut.exec(input)
    }

    expect(result).rejects.toThrow(new Error('Could not create client'))
  })

  it('should return client on success', async () => {
    fileUploadService.upload.mockResolvedValueOnce(image)

    const client = await sut.exec(input)

    expect(client).toBeInstanceOf(Client)
    expect(client.name.value).toBe(name)
    expect(client.email.value).toBe(email)
    expect(client.image.value).toBe(image)
  })
})
