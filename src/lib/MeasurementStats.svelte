<script>
  import { latestWeight, latestLength } from '$lib/data/measurements.js'
  import { formatRelative } from 'date-fns'
  import { dateRelativeString } from '$lib/data/date-helpers.js'

  const now = new Date()
  const then = new Date('2023-01-23')
  $: console.log(formatRelative(then, now))
</script>

<div class="stats stats-horizontal mb-2">
  <div class="stat">
    <div class="stat-title">Weight (kg)</div>
    <div class="stat-value">{$latestWeight?.value / 1000 || '--'}</div>
    <div class="stat-desc">
      as of {dateRelativeString($latestWeight.timestamp)}
    </div>
  </div>

  <div class="stat">
    <div class="stat-title">Length (cm)</div>
    <div class="stat-value">{$latestLength?.value || '--'}</div>
    {#if $latestLength}
      <div class="stat-desc">as of xx</div>
    {/if}
  </div>
</div>
