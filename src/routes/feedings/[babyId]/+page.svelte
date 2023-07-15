<script>
  /** @type {import('./$types').PageData} */
  export let data = {}

  const formatDate = (date) => {
    if (date.isNaN) return '--'
    const hours = date.getHours()
    const minutes = date.getMinutes()
    // compare the date to the current date
    // return if it is the same date
    const now = new Date()
    const nowDateString = now.toDateString()
    const isToday = date.toDateString() === nowDateString
    if (isToday) {
      return `${hours}:${minutes}`
    }
    return `${hours}:${minutes} ${nowDateString}`
  }

  const typeToString = (type) => {
    switch (type) {
      case 'BREASTBREASTMILK':
        return 'milk from breast'
      case 'BOTTLEFORMULA':
        return 'formula'
      case 'BOTTLEBREASTMILK':
        return 'breastmilk by bottle'
      case 'SOLIDFOOD':
        return 'solid food'
    }
  }
</script>

<h1>Feedings</h1>

{#if data.feedings}
  <div class="overflow-x-auto">
    <table class="table table-xs">
      <thead>
        <tr>
          <th>Start</th>
          <th>End</th>
          <th>Type</th>
          <th>Side</th>
          <th>volume (ml)</th>
          <th>Notes</th>
          <th>Recorded By</th>
        </tr>
      </thead>
      <tbody>
        {#each data.feedings as feeding}
          <tr>
            <td>
              {formatDate(feeding.start)}
            </td>
            <td>
              {formatDate(feeding.end)}
            </td>
            <td>
              {typeToString(feeding.type)}
            </td>
            <td>
              {#if feeding.switched}
                <span>Both</span>
              {:else}
                {feeding.startedBreast === 'LEFT' ? 'Left' : 'Right'}
              {/if}
            </td>
            <td>
              {feeding.volumeInMl || '--'}
            </td>
            <td>
              {feeding.notes || '--'}
            </td>
            <td>
              {feeding.recordedBy.name}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{:else}
  <p>Did not find any feeding records.</p>
{/if}
