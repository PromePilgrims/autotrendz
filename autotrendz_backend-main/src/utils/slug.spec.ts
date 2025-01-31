import { slugify } from '@/utils/slug'

describe('slugify', () => {
  it('should slugify string', () => {
    expect(slugify('Some String to Slugigify')).toBe('some-string-to-slugigify')
  })
})
