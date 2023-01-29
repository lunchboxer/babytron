<script>
  import { sleeps } from '$lib/data/sleeps.js'
  import { printShortDateString } from '$lib/data/date-helpers.js'
  import SleepLastSummary from '$lib/SleepLastSummary.svelte'

  const beginningOfToday = new Date(`${printShortDateString()}, 00:00:00`)
  $: allTodaySleeps = $sleeps.filter(
    (s) => s?.end > beginningOfToday.toISOString(),
  )

  // in hours precision to 0.1
  const totalSleep = (sleeps) => {
    let duration = 0
    for (const sleep of sleeps) {
      if (!sleep.end) continue
      const startDate = new Date(sleep.start)
      const endDate = new Date(sleep.end)
      const diffMillis = endDate.getTime() - startDate.getTime()
      const diffDecaHours = diffMillis / (60 * 1000 * 6)
      duration += diffDecaHours
    }
    return Math.trunc(duration) / 10
  }

  const averageDuration = (sleeps) => {
    const doneSleeps = sleeps.filter((f) => f.end)
    const sum = doneSleeps.reduce(
      (a, b) => a + (new Date(b.end).getTime() - new Date(b.start).getTime()),
      0,
    )
    return Math.round(sum / (doneSleeps.length * 60 * 1000))
  }
</script>

{#if $sleeps && $sleeps.length > 0}
  <div class="stats stats-horizontal">
    <div class="stat">
      <div class="stat-title">total hours</div>
      <div class="stat-value">{totalSleep($sleeps)}</div>
      <div class="stat-desc">Avg {averageDuration($sleeps)} min</div>
    </div>

    <div class="stat">
      <div class="stat-title">Sleep today</div>
      <div class="stat-value">{totalSleep(allTodaySleeps)} hrs</div>
      <div class="stat-desc">over {allTodaySleeps.length} naps</div>
    </div>
  </div>
  <SleepLastSummary />
{:else}
  <p>No sleep data</p>
{/if}
