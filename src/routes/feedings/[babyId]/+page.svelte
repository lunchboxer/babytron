<script>
  import { formatDate } from '$lib/data/date-helpers.js'
  export let data = {}

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
          <th>Volume</th>
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
              {formatDate(feeding.end) || 'ongoing'}
            </td>
            <td>
              {typeToString(feeding.type)}
            </td>
            <td>
              {#if feeding.type === 'BREASTBREASTMILK'}
                {#if feeding.switched}
                  <span>Both</span>
                {:else}
                  {feeding.startedBreast === 'LEFT' ? 'Left' : 'Right'}
                {/if}
              {/if}
            </td>
            <td>
              {feeding.volumeInMl ? feeding.volumeInMl + ' ml' : ''}
            </td>
            <td>
              {feeding.notes || ''}
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
