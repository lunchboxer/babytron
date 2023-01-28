import { subDays, differenceInCalendarDays } from 'date-fns'

export const gestationalAgeInDays = (dueDate) => {
  // take dueDate and find date 280 days before
  const date = new Date(dueDate)
  const dayZero = subDays(date, 280)
  // get today's date
  const today = new Date()
  // return difference in days
  return differenceInCalendarDays(today, dayZero)
}
export const gestationalAgeInWeeksString = (dueDate) => {
  const inDays = gestationalAgeInDays(dueDate)
  const weeks = Math.trunc(inDays / 7)
  const andDays = inDays % 7
  return `${weeks} weeks and ${andDays} days`
}
export const daysToEDD = (dueDate) => {
  const targetDate = new Date(dueDate)
  const today = new Date()
  return differenceInCalendarDays(targetDate, today)
}

export const isFuture = (date) => {
  const today = new Date()
  return today <= new Date(date)
}

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
  const now = new Date()
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
