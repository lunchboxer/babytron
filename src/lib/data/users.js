import { writable, get } from 'svelte/store'
import { me } from '$lib/data/me.js'
import { request } from '$graphql/client.js'
import {
  USER_COUNT,
  USERS,
  USER,
  UPDATE_USER,
  CREATE_USER,
  DELETE_USER,
} from '$graphql/users.gql'

function createUsersStore() {
  const { subscribe, set, update } = writable([])
  return {
    set,
    subscribe,
    // Get //
    get: async function (key) {
      if (key) {
        const response = await request(USER, { key })
        this.updateOne(response.user)
        return response.user
      }
      const response = await request(USERS)
      response && set(response.users)
    },
    count: async () => {
      const response = await request(USER_COUNT)
      return response.userCount
    },
    // Create //
    create: async (user) => {
      const response = await request(CREATE_USER, { input: { ...user } })
      console.log(response)
      update((existing) => [...existing, response.createUser])
    },
    updateOne: async function (user) {
      const meUser = get(me)
      if (user.key === meUser.key) {
        await me.set({ ...user })
      }
      update((existing) => {
        let sawUser = false
        const previousUsers = existing.map((u) => {
          if (u.key !== user.key) return u
          sawUser = true
          return user
        })
        if (!sawUser) return [...previousUsers, user]
        return previousUsers
      })
    },
    // Patch //
    patch: async function (user) {
      // probably need to clean user object before sending
      const response = await request(UPDATE_USER, {
        input: user,
      })
      this.updateOne(response.updateUser)
    },
    // Remove //
    remove: async (key) => {
      await request(DELETE_USER, { key })
      update((existing) => existing.filter((u) => u.key !== key))
      const meUser = get(me)
      if (key === meUser.key) me.set({})
    },
  }
}

export const users = createUsersStore()
