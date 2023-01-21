import { writable } from 'svelte/store'
import { request } from '$graphql/client.js'
import { LOGIN, CREATE_USER } from '$graphql/users.gql'
import { getObjectFromStorage } from './utils.js'
import { browser } from '$app/environment'

function createMeStore() {
  const { subscribe, set } = writable(getObjectFromStorage('me') || {})
  return {
    set,
    subscribe,
    login: async function (variables) {
      const response = await request(LOGIN, variables)
      set(response.login.user)
      localStorage.token = JSON.stringify(response.login.token)
    },
    signup: async function (input) {
      const response = await request(CREATE_USER, { input })
      set(response.createUser.user)
      localStorage.token = JSON.stringify(response.createUser.token)
    },
    logout: async function () {
      // await client('/api/logout')
      set({})
      localStorage.removeItem('token')
    },
  }
}

export const me = createMeStore()
browser &&
  me.subscribe((value) => {
    if (!value) return
    localStorage.me = JSON.stringify(value)
  })
