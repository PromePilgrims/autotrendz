export function dateDiffInMinutes(startTime: Date, endTime?: Date): number {
  if (!endTime) endTime = new Date()

  const startTimeUTC = Date.UTC(
    startTime.getFullYear(),
    startTime.getMonth(),
    startTime.getDate(),
    startTime.getHours(),
    startTime.getMinutes(),
  )
  const endTimeUTC = Date.UTC(
    endTime.getFullYear(),
    endTime.getMonth(),
    endTime.getDate(),
    endTime.getHours(),
    endTime.getMinutes(),
  )

  const timeDifference = Math.abs(startTimeUTC - endTimeUTC)

  return Math.floor(timeDifference / (1000 * 60))
}
