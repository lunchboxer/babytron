<script>
  import { diapers } from '$lib/data/diapers.js'
  import { printShortDateString } from '$lib/data/date-helpers.js'

  $: wetDiapers = $diapers.filter((d) => d?.isWet)
  $: dirtyDiapers = $diapers.filter((d) => d?.isDirty)

  const beginningOfToday = new Date(`${printShortDateString()}, 00:00:00`)
  $: allTodayDiapers = $diapers.filter(
    (d) => d?.timestamp > beginningOfToday.toISOString(),
  )
</script>

{#if $diapers && $diapers.length > 0}
  <div class="stats stats-horizontal">
    <div class="stat">
      <div class="stat-title">Wet:Dirty</div>
      <div class="stat-value">
        {wetDiapers.length}:{dirtyDiapers.length}
      </div>
    </div>

    <div class="stat">
      <div class="stat-title">Today</div>
      <div class="stat-value">{allTodayDiapers.length}</div>
    </div>
  </div>
{:else}
  <p>No diaper data</p>
{/if}
