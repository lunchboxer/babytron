<script>
  import { latestFeeding } from '$lib/data/feedings.js'
  import { timer } from '$lib/data/timer.js'
  import { formatDistanceToNowStrict } from 'date-fns'

  const clock = timer({ interval: 500 })

  const feedingDuration = (clock, feeding) => {
    const startDateObject = new Date(feeding.end)
    return formatDistanceToNowStrict(startDateObject, { unit: 'minute' })
  }
</script>

{#if $latestFeeding}
  <p>
    {#if $latestFeeding.type === 'BREASTBREASTMILK'}
      Fed from the {$latestFeeding.startedBreast}
      {$latestFeeding.switched ? 'then switched' : ''}
    {/if}
    {#if $latestFeeding.type === 'BOTTLEFORMULA'}
      Fed {$latestFeeding.volumeInMl
        ? `${$latestFeeding.volumeInMl} ml `
        : ''}of formula
    {/if}
    {#if $latestFeeding.type === 'BOTTLEBREASTMILK'}
      Fed {$latestFeeding.volumeInMl
        ? `${$latestFeeding.volumeInMl} ml `
        : ''}milk from the bottle
    {/if}
    {#if $latestFeeding.type === 'SOLIDFOOD'}
      Fed {$latestFeeding.volumeInMl} ml milk from the bottle
    {/if}
    {feedingDuration($clock, $latestFeeding)} ago
  </p>
{/if}
