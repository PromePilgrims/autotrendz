import { dateDiffInMinutes } from '@/utils'

describe('date-difference-in-minutes', () => {
  it('should return the difference in minutes between two dates', () => {
    const startDate = new Date('2023-01-01T12:00:00')
    const endDate = new Date('2023-01-01T13:30:00')

    expect(dateDiffInMinutes(startDate, endDate)).toBe(90)
  })
})
