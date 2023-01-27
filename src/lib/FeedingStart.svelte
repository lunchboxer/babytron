<script>
  import Input from '$lib/Input.svelte'
  import Form from '$lib/Form.svelte'
  import Textarea from '$lib/Textarea.svelte'
  import Select from '$lib/Select.svelte'
  import { feedings } from '$lib/data/feedings.js'
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
  let type = ''
  let showForm = false
  let startedBreast

  const onReset = () => {
    startDate = ''
    startTime = ''
    notes = ''
    type = ''
    startedBreast = ''
    showForm = false
  }

  const onSubmit = async () => {
    const start = new Date(`${startDate}, ${startTime}`)
    await feedings.create({
      notes,
      babyId: baby.id,
      start,
      type,
      startedBreast,
    })
    notifications.add({
      type: 'success',
      text: 'Started feeding record successfully.',
    })
    showForm = false
  }
  const feeding = () => {
    showForm = true
  }
</script>

{#if showForm}
  <Form {onSubmit} {onReset} submitLabel="Save Feeding">
    <Input type="date" bind:value={startDate} label="Start date" required />
    <Input type="time" bind:value={startTime} label="Start time" required />
    <Select required bind:value={type}>
      <option disabled value="">What kind of feeding?</option>
      <option value="BREASTBREASTMILK">Breastmilk from the breast</option>
      <option value="BOTTLEFORMULA">Formula from the bottle</option>
      <option value="BOTTLEBREASTMILK">Breastmilk from the bottle</option>
      <option value="SOLIDFOOD">Solid food</option>
    </Select>
    {#if type === 'BREASTBREASTMILK'}
      <h3>Started on which breast?</h3>
      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">Left</span>
          <input
            type="radio"
            name="dir-radio"
            class="radio"
            value="LEFT"
            bind:group={startedBreast}
          />
        </label>
      </div>
      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">Right</span>
          <input
            type="radio"
            name="dir-radio"
            class="radio"
            value="RIGHT"
            bind:group={startedBreast}
          />
        </label>
      </div>
    {/if}
    <Textarea label="Notes" bind:value={notes} />
  </Form>
{:else}
  <button class="btn btn-outline btn-sm" on:click={feeding}>
    New Feeding
  </button>
{/if}
