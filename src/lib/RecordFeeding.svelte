<script>
  import DashCard from '$lib/DashCard.svelte'
  import FeedingStart from '$lib/FeedingStart.svelte'
  import FeedingUpdate from '$lib/FeedingUpdate.svelte'
  import { faPersonBreastfeeding } from '@fortawesome/free-solid-svg-icons'

  export let baby = {}

  let feedingStarted = false
</script>

<DashCard title="Feedings" icon={faPersonBreastfeeding}>
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
  <p>Fed from the left breast last.</p>

  {#if feedingStarted}
    <FeedingUpdate {baby} />
  {:else}
    <FeedingStart {baby} />
  {/if}
</DashCard>
