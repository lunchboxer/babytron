import { writable, get } from 'svelte/store'
import { request } from '$graphql/client.js'
import {
  CREATE_FEEDING,
  UPDATE_FEEDING,
  DELETE_FEEDING,
  OPEN_FEEDING,
} from '$graphql/feedings.gql'
import { selectedBaby } from '$lib/data/babies.js'

// simpler to only maintain for one baby
function createFeedingStore() {
  const { subscribe, set, update } = writable([])
  return {
    subscribe,
    set,
    // Create //
    create: async (feeding) => {
      const response = await request(CREATE_FEEDING, { input: { ...feeding } })
      openFeeding.update((existing) => {
        existing[feeding.babyId] = response.createFeeding
        return { ...existing }
      })
      update((existing) => {
        return [...existing, response.createFeeding]
      })
      return response.createFeeding
    },
    // Patch //
    patch: async function (feeding) {
      const { recordedBy, baby, ...cleanFeeding } = feeding
      const response = await request(UPDATE_FEEDING, {
        input: { ...cleanFeeding },
      })
      update((existing) =>
        existing.map((f) => {
          if (f.id === feeding.id) return response.updateFeeding
          return f
        }),
      )
      if (response.updateFeeding?.end) {
        openFeeding.update((existing) => {
          if (existing[baby.id]?.id === feeding.id) delete existing[baby.id]
          return { ...existing }
        })
      }
    },
    // Remove //
    remove: async (id) => {
      await request(DELETE_FEEDING, { id })
      update((existing) => existing.filter((f) => f.id !== id))
      openFeeding.update((existing) => {
        const baby = get(selectedBaby)
        delete existing[baby.id]
        return { ...existing }
      })
    },
  }
}

export const feedings = createFeedingStore()

// only store for selected baby
function createOpenFeedingStore() {
  const { subscribe, set, update } = writable({})
  return {
    subscribe,
    set,
    update,
    // Get Open feeding session //
    get: async (babyId) => {
      const response = await request(OPEN_FEEDING, { babyId })
      update((existing) => {
        existing[babyId] = response.openFeeding
        return { ...existing }
      })
    },
  }
}

export const openFeeding = createOpenFeedingStore()
