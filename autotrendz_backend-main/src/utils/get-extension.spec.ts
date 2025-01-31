import { getExtension } from '@/utils'

describe('getExtension', () => {
  it('should return the extension of a file', () => {
    expect(getExtension('file.txt')).toBe('txt')
  })
})
