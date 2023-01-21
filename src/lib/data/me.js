import { writable } from 'svelte/store'
import { getObjectFromStorage } from './utils.js'
import { browser } from '$app/environment'
import { client } from '$lib/data/fetch-client.js'

function createMeStore() {
  const { subscribe, set } = writable(getObjectFromStorage('me') || {})
  return {
    set,
    subscribe,
    login: async function (parameters) {
      const response = await client('/api/login', parameters)
      set(response.user)
    },
    signup: async function (parameters) {
      const response = await client('/api/signup', parameters)
      set(response.user)
    },
    logout: async function () {
      await client('/api/logout')
      set({})
    },
  }
}

export const me = createMeStore()
browser &&
  me.subscribe((value) => {
    if (!value) return
    localStorage.me = JSON.stringify(value)
  })
