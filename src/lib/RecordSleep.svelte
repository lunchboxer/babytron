<script>
  import Error from '$lib/Error.svelte'
  import SleepingBaby from '$lib/SleepingBaby.svelte'
  import AwakeBaby from '$lib/AwakeBaby.svelte'
  import DashCard from '$lib/DashCard.svelte'
  import SleepStats from '$lib/SleepStats.svelte'
  import { openSleep, sleeps } from '$lib/data/sleeps.js'
  import { selectedBaby } from '$lib/data/babies.js'
  import { onMount } from 'svelte'
  import { faBed } from '@fortawesome/free-solid-svg-icons'

  export let baby = {}
  let loading = false
  let errors

  // use on mount so that the state is modified by the updated store
  onMount(async () => {
    loading = true
    try {
      await sleeps.get($selectedBaby.id)
    } catch (error) {
      errors = error
    } finally {
      loading = false
    }
  })
</script>

<DashCard title="Sleeps" icon={faBed}>
  <Error {errors} />
  <SleepStats />

  {#if loading}
    <p>...loading sleep data</p>
  {:else if $openSleep}
    <SleepingBaby sleep={$openSleep} />
  {:else}
    <AwakeBaby {baby} />
  {/if}
</DashCard>
