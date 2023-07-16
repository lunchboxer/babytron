<script>
  import formatDistanceStrict from 'date-fns/formatDistanceStrict'
  import { formatDate } from '$lib/data/date-helpers.js'
  export let data = {}

  const getDuration = (sleep) => {
    const { start, end } = sleep
    if (!end) return formatDistanceStrict(start, new Date())
    return formatDistanceStrict(start, end)
  }
</script>

<h1>Sleeps</h1>

{#if data.sleeps}
  <div class="overflow-x-auto">
    <table class="table table-xs">
      <thead>
        <tr>
          <th>Start</th>
          <th>End</th>
          <th>Duration</th>
          <th>Wake reason</th>
          <th>Notes</th>
          <th>Recorded By</th>
        </tr>
      </thead>
      <tbody>
        {#each data.sleeps as sleep}
          <tr>
            <td>
              {formatDate(sleep.start)}
            </td>
            <td>
              {formatDate(sleep.end) || 'ongoing'}
            </td>
            <td>
              {getDuration(sleep)}
            </td>
            <td>
              {sleep.wakeReason || ''}
            </td>
            <td>
              {sleep.notes || ''}
            </td>
            <td>
              {sleep.recordedBy.name}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{:else}
  <p>Did not find any feeding records.</p>
{/if}
