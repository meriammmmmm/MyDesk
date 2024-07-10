export function calculateTimeDifference(futureDateStr: string): any {
  const parts = futureDateStr.split(/[\s/:\s]/)
  const day = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10) - 1 // Month is zero-based
  const year = parseInt(parts[2], 10)
  const hours = parseInt(parts[3], 10)
  const minutes = parseInt(parts[4], 10)
  const inputDate: any = new Date(year, month, day, hours, minutes)
  const currentDate: any = new Date()
  const timeDifferenceInMilliSeconds = Math.floor(inputDate - currentDate)
  const objOfDate: any = millisecondsToDuration(timeDifferenceInMilliSeconds)
  return objOfDate
}
export const generateScheduleDate = (dates: any) => {
  let newDatesToReturn: object[] = []
  if (dates.length == 0) {
    return null
  } else {
    dates.map((el: any) => {
      const newStartFormat = el?.start ? calculateTimeDifference(el?.start) : null
      const newEndFormat = el?.end ? calculateTimeDifference(el?.end) : null
      newDatesToReturn.push({ start: newStartFormat, end: newEndFormat })
    })
    return newDatesToReturn
  }
}
export const generateTokenTime = (dates: any) => {
  if (dates.length == 0) {
    return null
  } else {
    const startDate = dates[0].start
    let endDate
    dates.map((el: any) => {
      if (el?.end) {
        endDate = el?.end
      }
    })
    if (startDate && endDate) {
      return calculateTimeDifferenceStartAndEnd(startDate, endDate)
    } else {
      return null
    }
  }
}
export function calculateTimeDifferenceStartAndEnd(dateInitial: string, dateFinal: string): any {
  // Parse the input date string
  const parts = dateInitial.split(/[\s/:\s]/)
  const day = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10) - 1 // Month is zero-based
  const year = parseInt(parts[2], 10)
  const hours = parseInt(parts[3], 10)
  const minutes = parseInt(parts[4], 10)
  const date1: any = new Date(year, month, day, hours, minutes)
  const parts1 = dateFinal.split(/[\s/:\s]/)
  const day1 = parseInt(parts1[0], 10)
  const month1 = parseInt(parts1[1], 10) - 1 // Month1 is zero-based
  const year1 = parseInt(parts1[2], 10)
  const hours1 = parseInt(parts1[3], 10)
  const minutes1 = parseInt(parts1[4], 10)
  const date2: any = new Date(year1, month1, day1, hours1, minutes1)

  const timeDifferenceInMilliSeconds = Math.floor(date2 - date1)
  const timeWithMinute = timeDifferenceInMilliSeconds / 1000 / 60
  return timeWithMinute
}
function millisecondsToDuration(ms: any) {
  const millisecondsInSecond = 1000
  const millisecondsInMinute = millisecondsInSecond * 60
  const millisecondsInHour = millisecondsInMinute * 60
  const millisecondsInDay = millisecondsInHour * 24
  const millisecondsInYear = millisecondsInDay * 365.25 // Approximate value for an average year

  const years = Math.floor(ms / millisecondsInYear)
  const remainingDays = Math.floor((ms % millisecondsInYear) / millisecondsInDay)
  const hours = Math.floor((ms % millisecondsInDay) / millisecondsInHour)
  const minutes = Math.floor((ms % millisecondsInHour) / millisecondsInMinute)
  const seconds = Math.floor((ms % millisecondsInMinute) / millisecondsInSecond)

  return {
    years,
    days: remainingDays,
    hours,
    minutes,
    seconds,
  }
}

export const formatCurrentDateAndNextDay = () => {
  const now = new Date()
  const day = now.getDate().toString().padStart(2, '0')
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const year = now.getFullYear()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const formattedCurrentDate = `${day}/${month}/${year} ${hours}:${minutes}`
  const nextDay = new Date(now.getTime() + 24 * 60 * 60 * 1000)
  const nextDayDay = nextDay.getDate().toString().padStart(2, '0')
  const nextDayMonth = (nextDay.getMonth() + 1).toString().padStart(2, '0')
  const nextDayYear = nextDay.getFullYear()
  const nextDayHours = nextDay.getHours().toString().padStart(2, '0')
  const nextDayMinutes = nextDay.getMinutes().toString().padStart(2, '0')
  const formattedNextDay = `${nextDayDay}/${nextDayMonth}/${nextDayYear} ${nextDayHours}:${nextDayMinutes}`
  return {
    current: formattedCurrentDate,
    nextDay: formattedNextDay,
  }
}
