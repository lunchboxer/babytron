import { writable } from 'svelte/store'
import { request } from '$graphql/client.js'
import {
  MILESTONE_ACHIEVEMENTS,
  LOG_MILESTONE_ACHIEVEMENT,
  UNACHIEVE_MILESTONE,
} from '$graphql/milestone-achievements.gql'

function createMilestoneAchievementsStore() {
  const { subscribe, set, update } = writable([])
  return {
    subscribe,
    set,
    // Get //
    get: async (babyId) => {
      const response = await request(MILESTONE_ACHIEVEMENTS, { babyId })
      set(response.milestoneAchievements)
    },
    achieve: async (babyId, milestoneId) => {
      const response = await request(LOG_MILESTONE_ACHIEVEMENT, {
        babyId,
        milestoneId,
      })
      update((existing) => {
        return [...existing, response.logMilestoneAchievement]
      })
    },
    unachieve: async (id) => {
      await request(UNACHIEVE_MILESTONE, { id })
      update((existing) => existing.filter((a) => a.id !== id))
    },
  }
}

export const milestoneAchievements = createMilestoneAchievementsStore()
