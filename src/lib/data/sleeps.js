import { writable, get } from 'svelte/store'
import { request } from '$graphql/client.js'
import {
  CREATE_SLEEP,
  OPEN_SLEEP,
  CLOSE_SLEEP,
  DELETE_SLEEP,
} from '$graphql/sleeps.gql'
import { selectedBaby } from '$lib/data/babies.js'

// might be simpler to only maintain for one baby
function createSleepsStore() {
  const { subscribe, set, update } = writable([])
  return {
    subscribe,
    set,
    // Create //
    create: async (sleep) => {
      const response = await request(CREATE_SLEEP, { input: { ...sleep } })
      openSleep.update((existing) => {
        existing[sleep.babyId] = response.createSleep
        return { ...existing }
      })
      update((existing) => {
        return [...existing, response.createSleep]
      })
      return response.createSleep
    },
    // Remove //
    remove: async (id) => {
      await request(DELETE_SLEEP, { id })
      update((existing) => existing.filter((b) => b.id !== id))
      openSleep.update((existing) => {
        const baby = get(selectedBaby)
        delete existing[baby.id]
        return { ...existing }
      })
    },
  }
}

export const sleeps = createSleepsStore()

function createOpenSleepStore() {
  const { subscribe, set, update } = writable({})
  return {
    subscribe,
    set,
    update,
    // Get Open Sleep //
    get: async (babyId) => {
      const response = await request(OPEN_SLEEP, { babyId })
      update((existing) => {
        existing[babyId] = response.openSleep
        return { ...existing }
      })
    },
    // Close Sleep //
    closeSleep: async (input) => {
      const response = await request(CLOSE_SLEEP, { input })
      const babyId = response.closeSleep?.baby?.id
      update((existing) => {
        delete existing[babyId]
        return { ...existing }
      })
    },
  }
}

export const openSleep = createOpenSleepStore()
