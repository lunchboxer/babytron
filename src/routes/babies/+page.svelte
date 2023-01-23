<script>
  import { babies } from '$lib/data/babies.js'
  import AddBaby from '$lib/AddBaby.svelte'
  import Error from '$lib/Error.svelte'
  import Fa from 'svelte-fa'
  import {
    faBaby,
    faPencil,
    faVenus,
    faMars,
  } from '@fortawesome/free-solid-svg-icons'

  export let data = {}
  const { errors, loadBabies } = data
  babies.set(loadBabies)
</script>

<h1>Babies</h1>

<Error {errors} />

{#if $babies}
  {#if $babies.length > 0}
    <p>{$babies?.length} {$babies?.length === 1 ? 'baby' : 'babies'}</p>
    {#each $babies as baby}
      <div class="card w-96 bg-base-100 shadow-xl border m-2">
        <figure class="bg-neutral p-4 my-0">
          <Fa icon={faBaby} size="8x" color="hsl(var(--nc))" />
        </figure>
        <div class="card-body pt-0">
          {#if baby.name}
            <h2 class="card-title">
              {baby.name}{baby.alternativeName
                ? ` (${baby.alternativeName})`
                : ''}
              {#if baby.gender === 'F'}
                <Fa icon={faVenus} />
              {/if}
              {#if baby.gender === 'M'}
                <Fa icon={faMars} />
              {/if}
            </h2>
          {:else}
            <h2 class="card-title">Unnamed Baby</h2>
          {/if}
          {#if baby.birthdate}
            <p>Birthdate: {baby.birthdate}</p>
          {:else if baby.dueDate}
            <p>Due date: {baby.dueDate}</p>
          {/if}
          <div class="card-actions justify-end">
            <a href="/babies/edit/{baby.id}" class="btn gap-2">
              <Fa icon={faPencil} />
              Edit
            </a>
          </div>
        </div>
      </div>
    {/each}
  {:else}
    <p>There are no babies in the system.</p>
  {/if}
{/if}
<AddBaby />
