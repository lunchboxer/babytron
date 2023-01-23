import { browser } from '$app/environment'

export function getObjectFromStorage(objectName) {
  if (!browser) return
  const coldObject = browser && localStorage.getItem(objectName)
  if (coldObject !== 'undefined') return JSON.parse(coldObject)
}

export function getDateString(date) {
  const dateObject = new Date(date)
  return dateObject.toUTCString()
}
