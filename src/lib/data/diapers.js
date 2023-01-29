import { writable, derived } from 'svelte/store'
import { request } from '$graphql/client.js'
import {
  RECENT_DIAPERS,
  CREATE_DIAPER,
  DELETE_DIAPER,
} from '$graphql/diapers.gql'

function createDiapersStore() {
  const { subscribe, set, update } = writable([])
  return {
    subscribe,
    set,
    // Get //
    get: async (babyId) => {
      const response = await request(RECENT_DIAPERS, { babyId })
      set(response.recentDiapers)
    },
    // Create //
    create: async (diaper) => {
      const response = await request(CREATE_DIAPER, { input: { ...diaper } })
      update((existing) => {
        return [...existing, response.createDiaper]
      })
      return response.createDiaper
    },
    // Remove //
    remove: async (id) => {
      await request(DELETE_DIAPER, { id })
      update((existing) => existing.filter((d) => d.id !== id))
    },
  }
}

export const diapers = createDiapersStore()

export const latestDiaper = derived(diapers, ($diapers) => {
  let mostRecent = $diapers[0]
  for (const diaper of $diapers) {
    mostRecent = diaper.timestamp > mostRecent?.timestamp ? diaper : mostRecent
  }
  return mostRecent
})
