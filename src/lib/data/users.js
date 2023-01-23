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
  CHANGE_PASSWORD,
} from '$graphql/users.gql'

function createUsersStore() {
  const { subscribe, set, update } = writable([])
  return {
    set,
    subscribe,
    // Get //
    get: async function (id) {
      if (id) {
        const response = await request(USER, { id })
        this.updateOne(response.user)
        return response.user
      }
      const response = await request(USERS)
      response && set(response.users)
    },
    // Create //
    create: async function (user) {
      const response = await request(CREATE_USER, { input: { ...user } })
      update((existing) => [...existing, response.createUser])
      this.getCount()
    },
    updateOne: async function (user) {
      const meUser = get(me)
      if (user.id === meUser.id) {
        await me.set({ ...user })
      }
      update((existing) => {
        let sawUser = false
        const previousUsers = existing.map((u) => {
          if (u.id !== user.id) return u
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
      const { fatherTo, motherTo, createdAt, updatedAt, ...cleanUser } = user
      const response = await request(UPDATE_USER, {
        input: cleanUser,
      })
      this.updateOne(response.updateUser)
    },
    // Remove //
    remove: async function (id) {
      await request(DELETE_USER, { id })
      update((existing) => existing.filter((u) => u.id !== id))
      const meUser = get(me)
      if (id === meUser.id) me.set({})
      this.getCount()
    },
    // Change Password //
    changePassword: async function (id, oldPassword, newPassword) {
      await request(CHANGE_PASSWORD, { id, oldPassword, newPassword })
    },
    // Get Count //
    getCount: async () => {
      const response = await request(USER_COUNT)
      userCount.set(response.userCount)
      return response.userCount
    },
  }
}

export const users = createUsersStore()

export const userCount = writable()
