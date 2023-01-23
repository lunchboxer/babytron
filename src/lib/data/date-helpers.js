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
