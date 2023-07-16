<script>
  import { faWater, faPoo } from '@fortawesome/free-solid-svg-icons'
  import Fa from 'svelte-fa'
  import { formatDate } from '$lib/data/date-helpers.js'
  export let data = {}
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
            <td align="center">
              {#if diaper.isWet}
                <Fa icon={faWater} />
              {/if}
            </td>
            <td align="center">
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
