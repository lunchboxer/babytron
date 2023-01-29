<script>
  import { latestDiaper } from '$lib/data/diapers.js'
  import { timer } from '$lib/data/timer.js'
  import { formatDistanceToNow } from 'date-fns'

  const clock = timer({ interval: 500 })

  const diaperDistance = (clock, diaper) => {
    const startDateObject = new Date(diaper.timestamp)
    return formatDistanceToNow(startDateObject)
  }

  const makeTimeString = (diaper) =>
    new Date(diaper.timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  const wetDirtyString = (diaper) => {
    if (diaper.isWet && diaper.isDirty) return 'wet and dirty'
    if (diaper.isDirty) return 'dirty'
    if (diaper.isWet) return 'wet'
  }
</script>

{#if $latestDiaper}
  <p>
    A {wetDirtyString($latestDiaper)} diaper changed {diaperDistance(
      $clock,
      $latestDiaper,
    )} ago at {makeTimeString($latestDiaper)}
  </p>
{/if}
