import { ChildNameValueObject } from '@/modules/folder/domain/value-object'

describe('child-name', () => {
  it('should throw error if name is undefined or null', () => {
    const name = undefined

    const childName = () => ChildNameValueObject.create(name)

    expect(childName).toThrow('Child name is required')
  })

  it('should throw error if name is not greater than 3 characters', () => {
    const name = 'fo'

    const childName = () => ChildNameValueObject.create(name)

    expect(childName).toThrow('Child name must be greater than 3 characters')
  })

  it('should throw error if name not less than 50 characters', () => {
    const name = 'Lorem ipsum dolor sit amet. Eum laborum dolores eum fugit.'

    const childName = () => ChildNameValueObject.create(name)

    expect(childName).toThrow('Child name must be less than 50 characters')
  })

  it('should normalize the child name correctly', () => {
    const name = 'Arquivos /dos/ Clientes'

    const childName = ChildNameValueObject.create(name)

    expect(childName.value).toBe('Arquivos dos Clientes')
  })
})
