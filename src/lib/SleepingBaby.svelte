<script>
  import Form from '$lib/Form.svelte'
  import Input from '$lib/Input.svelte'
  import Textarea from '$lib/Textarea.svelte'
  import DeleteThing from '$lib/DeleteThing.svelte'
  import { openSleep, sleeps } from '$lib/data/sleeps.js'
  import { notifications } from '$lib/notifications'
  import { timer } from '$lib/data/timer.js'
  import { formatDistanceToNow } from 'date-fns'
  import { printShortDateString } from '$lib/data/date-helpers.js'

  export let sleep

  const clock = timer({ interval: 500 })

  const sleepBackup = sleep
  let endDate = printShortDateString()
  let endTime
  let wakeReason = ''
  let notes
  let woke = false

  const onSubmit = async () => {
    const end = new Date(`${endDate}, ${endTime}`).toISOString()
    await openSleep.closeSleep({ id: sleep.id, end, wakeReason, notes })
    notifications.add({
      type: 'success',
      text: 'Completed sleep record successfully.',
    })
    woke = false
  }

  const onReset = () => {
    endDate = printShortDateString()
    endTime = ''
    notes = sleepBackup.notes
    wakeReason = ''
    woke = false
  }
  const wokeUp = () => {
    woke = true
  }

  const sleepDuration = (clock, sleep) => {
    const startDateObject = new Date(sleep.start)
    return formatDistanceToNow(startDateObject)
  }
  const sleepStartString = new Date(sleep.start).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  const deleteFunction = async () => {
    await sleeps.remove(sleep.id)
  }
</script>

<p>
  The baby fell asleep {sleepDuration($clock, sleep)} ago at {sleepStartString}.
</p>
{#if woke}
  <Form {onSubmit} {onReset} submitLabel="Save Sleep">
    <Input type="date" bind:value={endDate} label="End date" />
    <Input type="time" bind:value={endTime} label="End time" />
    <Input bind:value={wakeReason} label="Reason for waking" />
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
