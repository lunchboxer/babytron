<script>
  import Input from '$lib/Input.svelte'
  import Form from '$lib/Form.svelte'
  import Textarea from '$lib/Textarea.svelte'
  import Checkbox from '$lib/Checkbox.svelte'
  import DeleteThing from '$lib/DeleteThing.svelte'
  import { feedings } from '$lib/data/feedings.js'
  import { notifications } from '$lib/notifications'
  import { timer } from '$lib/data/timer.js'
  import { formatDistanceToNow } from 'date-fns'
  import { printShortDateString } from '$lib/data/date-helpers.js'

  export let feeding = {}

  const clock = timer({ interval: 500 })

  const feedingBackup = feeding

  let endDate = printShortDateString()
  let endTime
  let showForm = false

  const onReset = () => {
    endDate = printShortDateString()
    endTime = ''
    feeding = { ...feedingBackup }
    showForm = false
  }

  const onSubmit = async () => {
    feeding.end = new Date(`${endDate}, ${endTime}`).toISOString()
    await feedings.patch(feeding)
    notifications.add({
      type: 'success',
      text: 'Completed feeding record successfully.',
    })
    showForm = false
  }
  const showIt = () => {
    showForm = true
  }

  const feedingDuration = (clock, feeding) => {
    const startDateObject = new Date(feeding.start)
    return formatDistanceToNow(startDateObject)
  }
  const feedingStartString = new Date(feeding.start).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  const deleteFunction = async () => {
    await feedings.remove(feeding.id)
  }
</script>

<p>
  Feeding started {feedingDuration($clock, feeding)} ago at {feedingStartString}
</p>
{#if showForm}
  <Form {onSubmit} {onReset} submitLabel="Save Feeding">
    <Input type="date" bind:value={endDate} label="End date" required />
    <Input type="time" bind:value={endTime} label="End time" required />
    {#if feeding.type === 'BREASTBREASTMILK'}
      <Checkbox label="Switched breasts" bind:value={feeding.switched} />
    {:else}
      <Input
        type="number"
        bind:value={feeding.volumeInMl}
        label="Volume consumed in ml"
      />
    {/if}
    <Textarea label="Notes" bind:value={feeding.notes} />
  </Form>
{:else}
  <div class="card-action">
    <button class="btn btn-outline btn-sm" on:click={showIt}>
      Complete record
    </button>
    <DeleteThing
      {deleteFunction}
      mini
      thingName="feeding record starting at {feedingStartString}"
      label="discard"
    />
  </div>
{/if}
