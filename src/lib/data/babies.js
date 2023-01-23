import { writable, derived } from 'svelte/store'
import { getObjectFromStorage } from './utils.js'
import { browser } from '$app/environment'
import { request } from '$graphql/client.js'
import {
  BABIES,
  BABY,
  CREATE_BABY,
  UPDATE_BABY,
  DELETE_BABY,
  UNBIRTH,
} from '$graphql/babies.gql'

function createBabiesStore() {
  const { subscribe, set, update } = writable([])
  return {
    subscribe,
    set,
    // Get //
    get: async function (id) {
      if (id) {
        const response = await request(BABY, { id })
        this.updateOne(response.baby)
        return response.baby
      }
      const response = await request(BABIES)
      response && set(response.babies)
    },
    // Create //
    create: async (baby) => {
      console.log(baby)
      const response = await request(CREATE_BABY, { input: { ...baby } })
      update((existing) => [...existing, response.createBaby])
    },
    // Patch //
    patch: async function (baby) {
      const { father, mother, createdAt, updatedAt, ...cleanBaby } = baby
      const response = await request(UPDATE_BABY, {
        input: { ...cleanBaby },
      })
      update((existing) =>
        existing.map((b) => {
          if (b.id === baby.id) return response.updateBaby
          return b
        }),
      )
    },
    updateOne: function (baby) {
      update((existing) => {
        let sawBaby = false
        const previousBabies =
          existing &&
          existing.map((b) => {
            if (b.id !== baby.id) return b
            sawBaby = true
            return baby
          })
        if (!sawBaby) return [...previousBabies, baby]
        return previousBabies
      })
    },
    // Remove //
    remove: async (id) => {
      await request(DELETE_BABY, { id })
      update((existing) => existing.filter((b) => b.id !== id))
    },
    // Unbirth - change birthdate to null //
    unbirth: async function (id) {
      const newBaby = await request(UNBIRTH, { id })
      this.updateOne(newBaby)
    },
  }
}

export const babies = createBabiesStore()
export const selectedBabyId = writable(getObjectFromStorage('selectedBabyId'))
browser &&
  selectedBabyId.subscribe((value) => {
    if (!value) return
    localStorage.selectedBabyId = JSON.stringify(value)
  })

export const selectedBaby = derived(
  [babies, selectedBabyId],
  ([$babies, $selectedBabyId]) => {
    return $babies.find((b) => b.id === $selectedBabyId)
  },
)
