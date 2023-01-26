<script>
  import Error from '$lib/Error.svelte'
  import SleepingBaby from '$lib/SleepingBaby.svelte'
  import AwakeBaby from '$lib/AwakeBaby.svelte'
  import DashCard from '$lib/DashCard.svelte'
  import { openSleep } from '$lib/data/sleeps.js'
  import { selectedBaby } from '$lib/data/babies.js'
  import { onMount } from 'svelte'
  import { faBed } from '@fortawesome/free-solid-svg-icons'

  export let baby = {}
  let loading = false
  let errors

  // use on mount so that the state is modified by the updated store
  onMount(async () => {
    try {
      await openSleep.get($selectedBaby.id)
    } catch (error) {
      errors = error
    } finally {
      loading = false
    }
  })
</script>

<DashCard title="Sleeps">
  <Error {errors} />

  {#if loading}
    <p>...loading sleep data</p>
  {:else if $openSleep && $openSleep[$selectedBaby?.id]}
    <SleepingBaby sleep={$openSleep[$selectedBaby?.id]} />
  {:else}
    <AwakeBaby {baby} />
  {/if}
</DashCard>
