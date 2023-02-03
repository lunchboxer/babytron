<script>
  import DashCard from '$lib/DashCard.svelte'
  import { faPrescriptionBottleMedical } from '@fortawesome/free-solid-svg-icons'
  import Error from '$lib/Error.svelte'
  import { onMount } from 'svelte'

  export let baby = {}

  let loading = false
  let errors = ''

  onMount(async () => {
    loading = true
    try {
      await timeout(1500)
    } catch (error) {
      errors = error
    } finally {
      loading = false
    }
  })

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
</script>

<DashCard title="Medication" icon={faPrescriptionBottleMedical}>
  <Error {errors} />
  {#if loading}
    <p>...loading milestones</p>
  {:else}
    <p>Baby took some medicine</p>
  {/if}
</DashCard>
