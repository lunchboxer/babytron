import { writable } from 'svelte/store'
import { request } from '$graphql/client.js'
import { MILESTONE_ACHIEVEMENTS } from '$graphql/milestone-achievements.gql'

function createMilestoneAchievementsStore() {
  const { subscribe, set } = writable([])
  return {
    subscribe,
    set,
    // Get //
    get: async (babyId) => {
      const response = await request(MILESTONE_ACHIEVEMENTS, { babyId })
      set(response.milestoneAchievements)
    },
    achieve: (babyId, milestoneId) => {},
    unachieve: (babyId, milestoneId) => {},
  }
}

export const milestoneAchievements = createMilestoneAchievementsStore()
