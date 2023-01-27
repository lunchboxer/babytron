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

<DashCard title="Sleeps" icon={faBed}>
  <Error {errors} />
  <div class="stats stats-horizontal">
    <div class="stat">
      <div class="stat-title">total hours</div>
      <div class="stat-value">87</div>
      <div class="stat-desc">Avg 16.8/day</div>
    </div>

    <div class="stat">
      <div class="stat-title">Sleep today</div>
      <div class="stat-value">8.5hr</div>
      <div class="stat-desc">woke 4hr ago</div>
    </div>
  </div>

  {#if loading}
    <p>...loading sleep data</p>
  {:else if $openSleep && $openSleep[$selectedBaby?.id]}
    <SleepingBaby sleep={$openSleep[$selectedBaby?.id]} />
  {:else}
    <AwakeBaby {baby} />
  {/if}
</DashCard>
