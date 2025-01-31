import { Client, ClientId } from '@/modules/client/domain'

describe('client', () => {
  let now: Date
  let name: string
  let email: string
  let password: string
  let image: string
  let createdAt: Date
  let updatedAt: Date
  let lastLoginAt: Date

  beforeAll(() => {
    now = new Date('2023-11-06T20:23:32.980Z')
    name = 'landerson'
    email = 'OLA@OLA.com.br'
    password = 'any_password'
    image = 'https://www.site.com/image.png'
    createdAt = now
    updatedAt = now
    lastLoginAt = null
  })

  it('should create a valid client', async () => {
    const client = Client.create({
      id: ClientId.create(),
      name,
      email,
      password,
      image,
      createdAt,
      updatedAt,
      lastLoginAt,
    })

    await client.password.encrypt()

    client.activate()

    expect(client.isActive).toBe(true)
    expect(client.name.value).toBe('Landerson')
    expect(client.email.value).toBe('ola@ola.com.br')
    expect(client.password.compare('any_password')).resolves.toBe(true)
    expect(client.image.value).toBe('https://www.site.com/image.png')
    expect(client.lastLoginAt).toBe(null)
  })
})
