<script>
  import { latestWeight, latestLength } from '$lib/data/measurements.js'
  import { dateRelativeString } from '$lib/data/date-helpers.js'
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
    <div class="stat-value">{$latestLength?.value / 10 || '--'}</div>
    {#if $latestLength}
      <div class="stat-desc">
        as of {dateRelativeString($latestLength.timestamp)}
      </div>
    {/if}
  </div>
</div>
