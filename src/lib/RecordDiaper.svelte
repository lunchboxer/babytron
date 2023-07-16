<script>
  import Error from '$lib/Error.svelte'
  import Input from '$lib/Input.svelte'
  import Form from '$lib/Form.svelte'
  import Textarea from '$lib/Textarea.svelte'
  import Checkbox from '$lib/Checkbox.svelte'
  import DashCard from '$lib/DashCard.svelte'
  import DiaperStats from '$lib/DiaperStats.svelte'
  import DiaperLastSummary from '$lib/DiaperLastSummary.svelte'
  import { diapers } from '$lib/data/diapers.js'
  import { notifications } from '$lib/notifications'
  import { faPoop, faWater, faPoo } from '@fortawesome/free-solid-svg-icons'
  import { onMount } from 'svelte'
  import { printShortDateString } from '$lib/data/date-helpers.js'

  export let baby = {}
  let loading = false
  let errors = ''

  onMount(async () => {
    loading = true
    try {
      await diapers.get(baby.id)
    } catch (error) {
      errors = error
    } finally {
      loading = false
    }
  })

  let date = printShortDateString()
  let time
  let isWet = false
  let isDirty = false
  let notes
  let soiled = false

  const onReset = () => {
    date = printShortDateString()
    time = ''
    notes = ''
    isWet = false
    isDirty = false
    soiled = false
  }

  const onSubmit = async () => {
    const timestamp = new Date(`${date}, ${time}`).toISOString()
    await diapers.create({
      isWet,
      isDirty,
      notes,
      babyId: baby.id,
      timestamp,
    })
    notifications.add({
      type: 'success',
      text: 'Recorded diaper successfully.',
    })
    soiled = false
  }
  const gotSoiled = () => {
    soiled = true
  }
</script>

<DashCard title="Diapers" icon={faPoo}>
  <Error {errors} />
  {#if loading}
    <p>...Loading diaper data</p>
  {:else}
    <DiaperStats />
    <DiaperLastSummary />
  {/if}
  {#if soiled}
    <Form {onSubmit} {onReset} submitLabel="Save Diaper">
      <Input type="date" bind:value={date} label="Date" required />
      <Input type="time" bind:value={time} label="Time" required />
      <Checkbox bind:value={isWet} label="Wet" icon={faWater} />
      <Checkbox bind:value={isDirty} label="Dirty" icon={faPoop} />
      <Textarea label="Notes" bind:value={notes} />
    </Form>
  {:else}
    <button class="btn btn-outline btn-sm" on:click={gotSoiled}>
      Got a soiled diaper
    </button>
  {/if}
</DashCard>
