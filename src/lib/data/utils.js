import { browser } from '$app/environment'

export function getObjectFromStorage(objectName) {
  if (!browser) return
  const coldObject = browser && localStorage.getItem(objectName)
  return coldObject && JSON.parse(coldObject)
}
