import { writable, derived } from 'svelte/store'
import { request } from '$graphql/client.js'
import {
  CREATE_SLEEP,
  RECENT_SLEEPS,
  UPDATE_SLEEP,
  DELETE_SLEEP,
} from '$graphql/sleeps.gql'

// might be simpler to only maintain for one baby
function createSleepsStore() {
  const { subscribe, set, update } = writable([])
  return {
    subscribe,
    set,
    // Get //
    get: async (babyId) => {
      const response = await request(RECENT_SLEEPS, { babyId })
      set(response.recentSleeps)
    },
    // Create //
    create: async (sleep) => {
      const response = await request(CREATE_SLEEP, { input: { ...sleep } })
      update((existing) => {
        return [...existing, response.createSleep]
      })
      return response.createSleep
    },
    // Patch //
    patch: async function (sleep) {
      const { recordedBy, baby, ...cleanSleep } = sleep
      const response = await request(UPDATE_SLEEP, {
        input: { ...cleanSleep },
      })
      update((existing) =>
        existing.map((s) => {
          if (s.id === sleep.id) return response.updateSleep
          return s
        }),
      )
    },
    // Remove //
    remove: async (id) => {
      await request(DELETE_SLEEP, { id })
      update((existing) => existing.filter((s) => s.id !== id))
    },
  }
}

export const sleeps = createSleepsStore()

export const openSleep = derived(sleeps, ($sleeps) =>
  $sleeps.find((sleep) => !sleep.end),
)

export const latestSleep = derived(sleeps, ($sleeps) => {
  let mostRecent = $sleeps[0]
  for (const sleep of $sleeps) {
    mostRecent = sleep?.start > mostRecent?.start ? sleep : mostRecent
  }
  return mostRecent
})
