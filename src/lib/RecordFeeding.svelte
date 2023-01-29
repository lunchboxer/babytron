<script>
  import DashCard from '$lib/DashCard.svelte'
  import FeedingStart from '$lib/FeedingStart.svelte'
  import FeedingUpdate from '$lib/FeedingUpdate.svelte'
  import FeedingLastSummary from '$lib/FeedingLastSummary.svelte'
  import FeedingStats from '$lib/FeedingStats.svelte'
  import Error from '$lib/Error.svelte'
  import { faPersonBreastfeeding } from '@fortawesome/free-solid-svg-icons'
  import { feedings, openFeeding } from '$lib/data/feedings.js'
  import { selectedBaby } from '$lib/data/babies.js'
  import { onMount } from 'svelte'

  export let baby = {}

  let loading = false
  let errors = ''

  onMount(async () => {
    loading = true
    try {
      await feedings.get($selectedBaby.id)
    } catch (error) {
      errors = error
    } finally {
      loading = false
    }
  })
</script>

<DashCard title="Feedings" icon={faPersonBreastfeeding}>
  <Error {errors} />
  <FeedingStats feedings={$feedings} />
  {#if loading}
    <p>...loading feeding data</p>
  {:else if $openFeeding}
    <FeedingUpdate feeding={$openFeeding} />
  {:else}
    <FeedingLastSummary />
    <FeedingStart {baby} />
  {/if}
</DashCard>
