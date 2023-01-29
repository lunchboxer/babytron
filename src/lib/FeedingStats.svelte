<script>
  import { printShortDateString } from '$lib/data/date-helpers.js'

  export let feedings

  const allTodayFeedings = (feedings) => {
    const beginningOfToday = new Date(`${printShortDateString()}, 00:00:00`)
    return feedings.filter((f) => f?.end > beginningOfToday.toISOString())
  }

  const averageDuration = (feedings) => {
    const doneFeedings = feedings.filter((f) => f.end)
    const sum = doneFeedings.reduce(
      (a, b) => a + (new Date(b.end).getTime() - new Date(b.start).getTime()),
      0,
    )
    return Math.round(sum / (doneFeedings.length * 60 * 1000))
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

{#if feedings && feedings.length > 0}
  <div class="stats stats-horizontal mb-2">
    <div class="stat">
      <div class="stat-title">Avr duration</div>
      <div class="stat-value text-3xl">{averageDuration(feedings)} min</div>
      <div class="stat-desc">over {feedings.length} times</div>
    </div>

    <div class="stat">
      <div class="stat-title">Today</div>
      <div class="stat-value text-3xl">
        ×{allTodayFeedings(feedings).length}
      </div>
      <div class="stat-desc">{totalTimeToday(feedings)} minutes total</div>
    </div>
  </div>
{:else}
  <p>No feeding data</p>
{/if}
