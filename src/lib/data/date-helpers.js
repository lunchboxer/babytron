import { subDays, differenceInCalendarDays, getWeek } from 'date-fns'

const now = new Date()
// default to today
// useful as default value in a <input type="date" />
export const printShortDateString = (date) => {
  const workingDate = date || now
  const yyyy = workingDate.getFullYear()
  const month = workingDate.getMonth() + 1
  const mm = month.toString().padStart(2, 0)
  const dd = workingDate.getDate()
  return `${yyyy}-${mm}-${dd}`
}

export const gestationalAgeInDays = (dueDate) => {
  // take dueDate and find date 280 days before
  const date = new Date(dueDate)
  const dayZero = subDays(date, 280)
  // return difference in days
  return differenceInCalendarDays(now, dayZero)
}
export const gestationalAgeInWeeksString = (dueDate) => {
  const inDays = gestationalAgeInDays(dueDate)
  const weeks = Math.trunc(inDays / 7)
  const andDays = inDays % 7
  return `${weeks} weeks and ${andDays} days`
}
export const daysToEDD = (dueDate) => {
  const targetDate = new Date(dueDate)
  return differenceInCalendarDays(targetDate, now)
}

export const isFuture = (date) => now <= new Date(date)

export const toDateString = (date) => {
  const dateObject = new Date(date)
  return dateObject.toDateString()
}

function calculateAge(dob) {
  const diffMs = Date.now() - dob.getTime()
  const ageDt = new Date(diffMs)
  return Math.abs(ageDt.getUTCFullYear() - 1970)
}

// starts from Day 0 if now and birthdate are same date
// counting baby age is slightly different than other distance calc
export const ageStringFromBirthdate = (birthdate) => {
  if (!birthdate) return
  let ageString = ''
  const bdate = new Date(birthdate)
  const day = differenceInCalendarDays(now, bdate)
  // count in days up to 7 days
  if (day < 7) {
    return `${day} day${day === 1 ? '' : 's'}`
  }
  const week = Math.trunc(day / 7)
  const remainderDay = day % 7
  const month = Math.trunc(day / 30.437)
  // count in weeks up to 2 months
  if (month < 2 && week > 0) {
    ageString = `${week} week${week > 1 ? 's' : ''}`
    if (remainderDay !== 0) {
      ageString += ` and ${remainderDay} day${remainderDay > 1 ? 's' : ''}`
    }
    return ageString
  }
  // count in months until 2 years
  const year = calculateAge(bdate)
  if (year < 2) {
    ageString = `${month} months`
    const monthRemainder = Math.trunc(day % 30.437)
    if (monthRemainder > 0 && monthRemainder < 7 && month < 4) {
      ageString += ` and ${monthRemainder} day${
        monthRemainder === 1 ? '' : 's'
      }`
    }
    if (monthRemainder >= 7) {
      const remainderWeeks = Math.trunc(monthRemainder / 7)
      ageString += ` and ${remainderWeeks} week${
        remainderWeeks === 1 ? '' : 's'
      }`
    }
    return ageString
  }
  // add haf years up to five. Number of days in a year isn't exact
  // but half years aren't expected to be exact
  if (year < 5) {
    const yearRemainder = Math.trunc(day % 365.25)
    if (yearRemainder >= 153) return `${year}½ years`
  }
  return `${year} years`
}

const daysOfTheWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]
// Format the date relative to today
// return 'yesterday' or 'last Tuesday'
// only works with past dates
export const dateRelativeString = (date) => {
  const dateObject = new Date(date)
  const todayMidnight = new Date(
    `${printShortDateString()}, 00:00:00`,
  ).toISOString()
  if (date >= todayMidnight) return 'today'
  const yesterdayMidnight = subDays(new Date(todayMidnight), 1)
  if (date >= yesterdayMidnight) return 'yesterday'
  const thisWeek = getWeek(now)
  const thatWeek = getWeek(dateObject)
  if (thisWeek === thatWeek) return daysOfTheWeek[dateObject.getDay()]
  if (thisWeek === thatWeek + 1) {
    return `last ${daysOfTheWeek[dateObject.getDay()]}`
  }
  return dateObject.toDateString()
}
