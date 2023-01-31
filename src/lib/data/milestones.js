import { writable } from 'svelte/store'
import { request } from '$graphql/client.js'
import { MILESTONES } from '$graphql/milestones.gql'

export const allMonthsAges = [2, 4, 6, 9, 12, 15, 18, 24, 30, 36, 48, 60]
export const allCategories = [
  { short: 'SEL', long: 'Social/Emotional' },
  { short: 'LANG', long: 'Language/Communication' },
  { short: 'COG', long: 'Cognitive' },
  { short: 'PHYS', long: 'Movement/Physical Development' },
]

function createMilestonesStore() {
  const { subscribe, set } = writable([])
  return {
    subscribe,
    set,
    // Get //
    get: async (category, monthsAge) => {
      const response = await request(MILESTONES, {
        input: { category, monthsAge },
      })
      set(response.milestones)
      return response.milestones
    },
  }
}

export const milestones = createMilestonesStore()
