<script>
  import DashCard from '$lib/DashCard.svelte'
  import FeedingStart from '$lib/FeedingStart.svelte'
  import FeedingUpdate from '$lib/FeedingUpdate.svelte'
  import Error from '$lib/Error.svelte'
  import { faPersonBreastfeeding } from '@fortawesome/free-solid-svg-icons'
  import { openFeeding } from '$lib/data/feedings.js'
  import { selectedBaby } from '$lib/data/babies.js'
  import { onMount } from 'svelte'

  export let baby = {}

  let loading = false
  let errors = ''

  onMount(async () => {
    loading = true
    try {
      await openFeeding.get($selectedBaby.id)
    } catch (error) {
      errors = error
    } finally {
      loading = false
    }
  })
</script>

<DashCard title="Feedings" icon={faPersonBreastfeeding}>
  <Error {errors} />
  <div class="stats stats-horizontal mb-2">
    <div class="stat">
      <div class="stat-title">Time since fed</div>
      <div class="stat-value text-3xl">45 min</div>
      <div class="stat-desc">for 12 minutes</div>
    </div>

    <div class="stat">
      <div class="stat-title">Today</div>
      <div class="stat-value text-3xl">6</div>
      <div class="stat-desc">204 minutes total</div>
    </div>
  </div>

  {#if loading}
    <p>...loading feeding data</p>
  {:else if $openFeeding && $openFeeding[$selectedBaby?.id]}
    <FeedingUpdate feeding={$openFeeding[$selectedBaby?.id]} />
  {:else}
    <p>Fed from the left breast last.</p>
    <FeedingStart {baby} />
  {/if}
</DashCard>
