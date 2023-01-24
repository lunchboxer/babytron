<script>
  import { babies } from '$lib/data/babies.js'
  import Error from '$lib/Error.svelte'
  import Fa from 'svelte-fa'
  import BabyName from '$lib/BabyName.svelte'
  import BabySelect from '$lib/BabySelect.svelte'
  import {
    faPlus,
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
  <BabySelect />
  {#if $babies.length > 0}
    <p>
      {$babies?.length}
      {$babies?.length === 1 ? 'baby' : 'babies'} in records
    </p>
    <div class="flex flex-wrap">
      {#each $babies as baby}
        <div class="card w-96 lg:card-side bg-base-200 shadow m-2">
          <div class="card-body pt-0">
            <h2 class="card-title">
              <BabyName {baby} />
              {#if baby.gender === 'F'}
                <Fa icon={faVenus} />
              {/if}
              {#if baby.gender === 'M'}
                <Fa icon={faMars} />
              {/if}
            </h2>
            {#if baby.birthdate}
              <p>Birthdate: {baby.birthdate}</p>
            {:else if baby.dueDate}
              <p>Due date: {baby.dueDate}</p>
            {/if}
            <div class="card-actions justify-end">
              <a href="/babies/edit/{baby.id}" class="btn btn-outline gap-2">
                <Fa icon={faPencil} />
                Edit
              </a>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <p>There are no babies in the system.</p>
  {/if}
{/if}
<a href="/babies/add-baby" class="btn gap-2 mt-2">
  <Fa icon={faPlus} />Add a baby
</a>
