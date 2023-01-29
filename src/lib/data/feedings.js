import { writable, derived } from 'svelte/store'
import { request } from '$graphql/client.js'
import {
  CREATE_FEEDING,
  UPDATE_FEEDING,
  DELETE_FEEDING,
  RECENT_FEEDINGS,
} from '$graphql/feedings.gql'

// simpler to only maintain for one baby
function createFeedingStore() {
  const { subscribe, set, update } = writable([])
  return {
    subscribe,
    set,
    // Get //
    get: async (babyId) => {
      const response = await request(RECENT_FEEDINGS, { babyId })
      set(response.recentFeedings)
    },
    // Create //
    create: async (feeding) => {
      const response = await request(CREATE_FEEDING, { input: { ...feeding } })
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
    },
    // Remove //
    remove: async (id) => {
      await request(DELETE_FEEDING, { id })
      update((existing) => existing.filter((f) => f.id !== id))
    },
  }
}

export const feedings = createFeedingStore()

// should this not be derived as well and just forget about baby.id
// only store for selected baby
// function createOpenFeedingStore() {
//   const { subscribe, set, update } = writable({})
//   return {
//     subscribe,
//     set,
//     update,
//     // Get Open feeding session //
//     get: async (babyId) => {
//       const response = await request(OPEN_FEEDING, { babyId })
//       update((existing) => {
//         existing[babyId] = response.openFeeding
//         return { ...existing }
//       })
//     },
//   }
// }

// export const openFeeding = createOpenFeedingStore()

export const openFeeding = derived(feedings, ($feedings) =>
  $feedings.find((feeding) => !feeding.end),
)

export const latestFeeding = derived(feedings, ($feedings) => {
  let mostRecent = $feedings[0]
  for (const feeding of $feedings) {
    mostRecent = feeding?.start > mostRecent?.start ? feeding : mostRecent
  }
  return mostRecent
})
