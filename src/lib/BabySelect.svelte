<script>
  import { babies, selectedBabyId } from '$lib/data/babies.js'

  let selected = ''

  const selectActive = () => selected && selectedBabyId.set(selected)
</script>

{#if $babies?.length > 0}
  <div class="form-control w-full max-w-xs">
    <label class="label" for="babySelect">
      <span class="label-text">Selected Baby</span>
    </label>
    <select
      name="babySelect"
      bind:value={selected}
      on:change={selectActive}
      class="select select-bordered w-full max-w-xs"
    >
      <option disabled value=""> Select a baby </option>
      {#each $babies as baby}
        {#if baby.name}
          <option value={baby.id}>
            {baby.name}
            {baby.alternativeName ? `(${baby.alternativeName})` : ''}
          </option>
        {:else}
          <option value={baby.id}>
            Unnamed baby
            {#if baby.birthdate}
              born {baby.birthdate}
            {/if}
            {#if baby.dueDate}
              due {baby.dueDate}
            {/if}
          </option>
        {/if}
      {/each}
    </select>
  </div>
{:else}
  <p>No babies have been add yet.</p>
{/if}
