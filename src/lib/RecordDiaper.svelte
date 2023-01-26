<script>
  import Input from '$lib/Input.svelte'
  import Form from '$lib/Form.svelte'
  import Textarea from '$lib/Textarea.svelte'
  import Checkbox from '$lib/Checkbox.svelte'
  import { diapers } from '$lib/data/diapers.js'
  import { notifications } from '$lib/notifications'
  import Fa from 'svelte-fa'
  import { faPoop, faWater } from '@fortawesome/free-solid-svg-icons'

  export let baby = {}

  let date
  let time
  let isWet = false
  let isDirty = false
  let notes

  const onReset = () => {
    date = ''
    time = ''
    notes = ''
    isWet = false
    isDirty = false
  }

  const onSubmit = async () => {
    const timestamp = new Date().toISOString()
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
  }
</script>

<h2>Record Diaper</h2>

<Form {onSubmit} {onReset} submitLabel="Save Diaper">
  <Input type="date" bind:value={date} label="Date" required />
  <Input type="time" bind:value={time} label="Time" required />
  <Checkbox bind:value={isWet} label="Wet" icon={faWater} />
  <Checkbox bind:value={isDirty} label="Dirty" icon={faPoop} />
  <Textarea label="Notes" bind:value={notes} />
</Form>
