<script>
  import Input from '$lib/Input.svelte'
  import Form from '$lib/Form.svelte'
  import Textarea from '$lib/Textarea.svelte'
  import { sleeps } from '$lib/data/sleeps.js'
  import { notifications } from '$lib/notifications'

  export let baby = {}

  const staleNow = new Date()
  const yyyy = staleNow.getFullYear()
  const month = staleNow.getMonth() + 1
  const mm = month.toString().padStart(2, 0)
  const dd = staleNow.getDate()

  let startDate = `${yyyy}-${mm}-${dd}`
  let startTime
  let notes
  let asleep = false

  const onReset = () => {
    startDate = `${yyyy}-${mm}-${dd}`
    startTime = ''
    notes = ''
    asleep = false
  }

  const onSubmit = async () => {
    const start = new Date(`${startDate}, ${startTime}`)
    await sleeps.create({
      start,
      notes,
      babyId: baby.id,
    })
    notifications.add({
      type: 'success',
      text: 'Recorded sleep successfully.',
    })
    asleep = false
  }
  const fellAsleep = () => {
    asleep = true
  }
</script>

{#if asleep}
  <Form {onSubmit} {onReset}>
    <Input bind:value={startDate} type="date" label="Start date" required />
    <Input bind:value={startTime} type="time" label="Start time" required />
    <Textarea bind:value={notes} label="Notes" />
  </Form>
{:else}
  <button class="btn btn-outline btn-sm" on:click={fellAsleep}>
    Fell asleep
  </button>
{/if}
