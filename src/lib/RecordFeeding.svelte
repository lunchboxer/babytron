<script>
  import DashCard from '$lib/DashCard.svelte'
  import FeedingStart from '$lib/FeedingStart.svelte'
  import FeedingUpdate from '$lib/FeedingUpdate.svelte'
  import FeedingLastSummary from '$lib/FeedingLastSummary.svelte'
  import Error from '$lib/Error.svelte'
  import { faPersonBreastfeeding } from '@fortawesome/free-solid-svg-icons'
  import { feedings, openFeeding } from '$lib/data/feedings.js'
  import { selectedBaby } from '$lib/data/babies.js'
  import { onMount } from 'svelte'
  import { printShortDateString } from '$lib/data/date-helpers.js'

  export let baby = {}

  let loading = false
  let errors = ''

  onMount(async () => {
    loading = true
    try {
      await feedings.get($selectedBaby.id)
    } catch (error) {
      errors = error
    } finally {
      loading = false
    }
  })

  const allTodayFeedings = (feedings) => {
    const beginningOfToday = new Date(`${printShortDateString()}, 00:00:00`)
    return feedings.filter((f) => f?.end > beginningOfToday.toISOString())
  }

  const averageDuration = (feedings) => {
    const sum = feedings.reduce(
      (a, b) => a + (new Date(b.end).getTime() - new Date(b.start).getTime()),
      0,
    )
    return Math.round(sum / (feedings.length * 60 * 1000))
  }
  const totalTimeToday = (feedings) => {
    let duration = 0
    for (const feeding of allTodayFeedings(feedings)) {
      const startDate = new Date(feeding.start)
      const endDate = new Date(feeding.end)
      const diffMillis = endDate.getTime() - startDate.getTime()
      const diffMinutes = diffMillis / (60 * 1000)
      duration += diffMinutes
    }
    return duration
  }
</script>

<DashCard title="Feedings" icon={faPersonBreastfeeding}>
  <Error {errors} />
  <div class="stats stats-horizontal mb-2">
    <div class="stat">
      <div class="stat-title">Avr duration</div>
      <div class="stat-value text-3xl">{averageDuration($feedings)} min</div>
      <div class="stat-desc">over {$feedings.length} times</div>
    </div>

    <div class="stat">
      <div class="stat-title">Today</div>
      <div class="stat-value text-3xl">
        ×{allTodayFeedings($feedings).length}
      </div>
      <div class="stat-desc">{totalTimeToday($feedings)} minutes total</div>
    </div>
  </div>

  {#if loading}
    <p>...loading feeding data</p>
  {:else if $openFeeding}
    <FeedingUpdate feeding={$openFeeding} />
  {:else}
    <FeedingLastSummary {baby} />
    <FeedingStart {baby} />
  {/if}
</DashCard>
