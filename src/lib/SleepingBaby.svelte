<script>
  import Form from '$lib/Form.svelte'
  import Input from '$lib/Input.svelte'
  import Textarea from '$lib/Textarea.svelte'
  import DeleteThing from '$lib/DeleteThing.svelte'
  import { sleeps } from '$lib/data/sleeps.js'
  import { notifications } from '$lib/notifications'
  import { printShortDateString } from '$lib/data/date-helpers.js'

  export let sleep

  const sleepBackup = sleep
  let endDate = printShortDateString()
  let endTime
  let woke = false

  const onSubmit = async () => {
    sleep.end = new Date(`${endDate}, ${endTime}`).toISOString()
    await sleeps.patch(sleep)
    notifications.add({
      type: 'success',
      text: 'Completed sleep record successfully.',
    })
    woke = false
  }

  const onReset = () => {
    endDate = printShortDateString()
    endTime = ''
    sleep = { ...sleepBackup }
    woke = false
  }
  const wokeUp = () => {
    woke = true
  }

  const sleepStartString = new Date(sleep.start).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  const deleteFunction = async () => {
    await sleeps.remove(sleep.id)
  }
</script>

{#if woke}
  <Form {onSubmit} {onReset} submitLabel="Save Sleep">
    <Input type="date" bind:value={endDate} label="End date" />
    <Input type="time" bind:value={endTime} label="End time" />
    <Input bind:value={sleep.wakeReason} label="Reason for waking" />
    <Textarea label="Notes" bind:value={sleep.notes} />
  </Form>
{:else}
  <div class="card-actions">
    <button class="btn btn-outline btn-sm" on:click={wokeUp}> Woke up </button>
    <DeleteThing
      {deleteFunction}
      mini
      thingName="sleep record starting {sleepStartString}"
      label="discard record"
    />
  </div>
{/if}
