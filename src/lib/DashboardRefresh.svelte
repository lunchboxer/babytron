<script>
  import { selectedBaby } from '$lib/data/babies.js'
  import Fa from 'svelte-fa'
  import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
  import { REFRESH_DASHBOARD } from '$graphql/refresh.gql'
  import { request } from '$graphql/client.js'
  import { measurements } from '$lib/data/measurements.js'
  import { sleeps } from '$lib/data/sleeps.js'
  import { diapers } from '$lib/data/diapers.js'
  import { feedings } from '$lib/data/feedings.js'
  import { milestoneAchievements } from '$lib/data/milestone-achievements.js'
  export let errors = ''

  let spin = false
  const refresh = async () => {
    spin = true
    try {
      const result = await request(REFRESH_DASHBOARD, {
        babyId: $selectedBaby.id,
      })
      measurements.set([result.weight, result.length])
      sleeps.set(result.recentSleeps)
      diapers.set(result.recentDiapers)
      feedings.set(result.recentFeedings)
      milestoneAchievements.set(result.milestoneAchievements)
      errors = ''
    } catch (error) {
      errors = error
    } finally {
      spin = false
    }
  }
</script>

<button class="btn btn-circle btn-sm btn-outline" on:click={refresh}>
  <Fa icon={faArrowsRotate} {spin} />
</button>
