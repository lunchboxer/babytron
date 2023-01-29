import { writable, derived } from 'svelte/store'
import { request } from '$graphql/client.js'
import {
  CREATE_MEASUREMENT,
  DELETE_MEASUREMENT,
  LATEST_MEASUREMENTS,
} from '$graphql/measurements.gql'

function createMeasurementsStore() {
  const { subscribe, set, update } = writable([])
  return {
    subscribe,
    set,
    get: async (babyId) => {
      const response = await request(LATEST_MEASUREMENTS, { babyId })
      update((existing) => {
        return [...existing, response.weight, response.length]
      })
      return response
    },
    // Create //
    create: async (measurement) => {
      const response = await request(CREATE_MEASUREMENT, {
        input: { ...measurement },
      })
      update((existing) => {
        return [...existing, response.createMeasurement]
      })
    },
    // Remove //
    remove: async (id) => {
      await request(DELETE_MEASUREMENT, { id })
      update((existing) => existing.filter((m) => m.id !== id))
    },
  }
}

export const measurements = createMeasurementsStore()

export const latestWeight = derived(measurements, ($measurements) => {
  const weights = $measurements.filter((m) => m?.type === 'weightInGrams')
  let mostRecent = weights[0]
  for (const weight of weights) {
    mostRecent = weight?.timestamp > mostRecent?.timestamp ? weight : mostRecent
  }
  return mostRecent
})

export const latestLength = derived(measurements, ($measurements) => {
  const lengths = $measurements.filter((m) => m?.type === 'lengthInMillimeters')
  let mostRecent = lengths[0]
  for (const length of lengths) {
    mostRecent = length?.timestamp > mostRecent?.timestamp ? length : mostRecent
  }
  return mostRecent
})
