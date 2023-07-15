<script>
  import { faWater, faPoo } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  /** @type {import('./$types').PageData} */
  export let data = {}

  // We'll first need to check the url param then fetch just the one baby.

  const formatDate = (date) => {
    if (date.isNaN) return '--'
    // compare the date to the current date
    // return if it is the same date
    const now = new Date()
    const nowDateString = now.toDateString()
    const isToday = date.toDateString() === nowDateString
    const time = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
    if (isToday) {
      return time
    }
    return `${time} ${nowDateString}`
  }
</script>

<h1>Diapers</h1>

{#if data.diapers}
  <div class="overflow-x-auto">
    <table class="table table-xs">
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Wet</th>
          <th>Dirty</th>
          <th>Notes</th>
          <th>Recorded By</th>
        </tr>
      </thead>
      <tbody>
        {#each data.diapers as diaper}
          <tr>
            <td>
              {formatDate(diaper.timestamp)}
            </td>
            <td>
              {#if diaper.isWet}
                <Fa icon={faWater} />
              {/if}
            </td>
            <td>
              {#if diaper.isDirty}
                <Fa icon={faPoo} />
              {/if}
            </td>
            <td>
              {diaper.notes || ''}
            </td>
            <td>
              {diaper.recordedBy.name}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{:else}
  <p>Did not find any diaper records.</p>
{/if}
