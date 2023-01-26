import { writable } from 'svelte/store'
import { request } from '$graphql/client.js'
import { CREATE_MEASUREMENT } from '$graphql/measurements.gql'

function createMeasurementsStore() {
  const { subscribe, set } = writable([])
  return {
    subscribe,
    set,
    // Create //
    create: async (measurement) => {
      await request(CREATE_MEASUREMENT, {
        input: { ...measurement },
      })
    },
    // Remove //
    remove: async (id) => {
      // await request(DELETE_BABY, { id })
      // update((existing) => existing.filter((b) => b.id !== id))
    },
  }
}

export const measurements = createMeasurementsStore()
