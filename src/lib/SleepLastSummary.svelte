<script>
  import { latestSleep, openSleep } from '$lib/data/sleeps.js'
  import { timer } from '$lib/data/timer.js'
  import { formatDistanceToNow } from 'date-fns'

  const clock = timer({ interval: 500 })

  const wakeDistance = (clock, sleep) => {
    const startDateObject = new Date(sleep.end)
    return formatDistanceToNow(startDateObject)
  }
  const sleepDistance = (clock, sleep) => {
    const startDateObject = new Date(sleep.start)
    return formatDistanceToNow(startDateObject)
  }
  const sleepDuration = (sleep) => {
    const startDate = new Date(sleep.start)
    const endDate = new Date(sleep.end)
    const diffMillis = endDate.getTime() - startDate.getTime()
    return Math.round(diffMillis / (60 * 1000))
  }

  const makeSleepStartString = (sleep) =>
    new Date(sleep.start).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
</script>

{#if $latestSleep && $latestSleep.end}
  <p>
    Baby last slept for {sleepDuration($latestSleep)} minutes and woke {wakeDistance(
      $clock,
      $latestSleep,
    )} ago
  </p>
{/if}
{#if $openSleep}
  <p>
    The baby fell asleep {sleepDistance($clock, $openSleep)} ago at {makeSleepStartString(
      $openSleep,
    )}.
  </p>
{/if}
