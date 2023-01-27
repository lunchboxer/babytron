<script>
  import Input from '$lib/Input.svelte'
  import Form from '$lib/Form.svelte'
  import Textarea from '$lib/Textarea.svelte'
  import Checkbox from '$lib/Checkbox.svelte'
  import { diapers } from '$lib/data/diapers.js'
  import { notifications } from '$lib/notifications'

  export let baby = {}

  const staleNow = new Date()
  const yyyy = staleNow.getFullYear()
  const month = staleNow.getMonth() + 1
  const mm = month.toString().padStart(2, 0)
  const dd = staleNow.getDate()

  let startDate = `${yyyy}-${mm}-${dd}`
  let endDate = `${yyyy}-${mm}-${dd}`
  let startTime
  let endTime
  let notes
  let showForm = false
  let volumeInMl

  const onReset = () => {
    startDate = ''
    startTime = ''
    notes = ''
    showForm = false
  }

  const onSubmit = async () => {
    const timestamp = new Date().toISOString()
    await diapers.create({
      notes,
      babyId: baby.id,
      timestamp,
    })
    notifications.add({
      type: 'success',
      text: 'Recorded diaper successfully.',
    })
    showForm = false
  }
  const feeding = () => {
    showForm = true
  }
</script>

{#if showForm}
  <Form {onSubmit} {onReset} submitLabel="Save Feeding">
    <Input type="date" bind:value={endDate} label="End date" required />
    <Input type="time" bind:value={endTime} label="End time" required />
    <Input
      type="number"
      bind:value={volumeInMl}
      label="Volume consumed in ml"
    />
    <Checkbox label="Switched breasts" />
    <Textarea label="Notes" bind:value={notes} />
  </Form>
{:else}
  <button class="btn btn-outline btn-sm" on:click={feeding}>
    New Feeding
  </button>
{/if}
