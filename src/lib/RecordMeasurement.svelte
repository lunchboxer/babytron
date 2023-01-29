<script>
  import Input from '$lib/Input.svelte'
  import Form from '$lib/Form.svelte'
  import Error from '$lib/Error.svelte'
  import DashCard from '$lib/DashCard.svelte'
  import MeasurementStats from '$lib/MeasurementStats.svelte'
  import { onMount } from 'svelte'
  import { measurements } from '$lib/data/measurements.js'
  import { notifications } from '$lib/notifications'
  import { faRuler } from '@fortawesome/free-solid-svg-icons'

  export let baby = {}

  let weight
  let length
  let headCircumference
  let show = false
  let loading = false
  let errors = ''

  onMount(async () => {
    loading = true
    try {
      await measurements.get(baby.id)
    } catch (error) {
      errors = error
    } finally {
      loading = false
    }
  })

  const onReset = () => {
    weight = ''
    length = ''
    headCircumference = ''
    show = false
  }
  const onSubmit = async () => {
    const timestamp = new Date().toISOString()
    if (weight) {
      await measurements.create({
        type: 'weightInGrams',
        value: weight,
        babyId: baby.id,
        timestamp,
      })
      notifications.add({
        type: 'success',
        text: 'Recorded weight successfully.',
      })
    }
    if (length) {
      await measurements.create({
        type: 'lengthInMillimeters',
        value: length,
        babyId: baby.id,
        timestamp,
      })
      notifications.add({
        type: 'success',
        text: 'Recorded length successfully.',
      })
    }
    if (headCircumference) {
      await measurements.create({
        type: 'headCircumferenceInMillimeters',
        value: headCircumference,
        babyId: baby.id,
        timestamp,
      })
      notifications.add({
        type: 'success',
        text: 'Recorded head circumference successfully.',
      })
    }
    show = false
  }

  const showForm = () => {
    show = true
  }
</script>

<DashCard title="Measurements" icon={faRuler}>
  <Error {errors} />
  {#if loading}
    <p>...loading measurements</p>
  {:else}
    <MeasurementStats />
  {/if}
  {#if show}
    <Form {onSubmit} {onReset} submitLabel="Save">
      <Input
        bind:value={weight}
        type="number"
        min="200"
        max="11000"
        label="Weight in grams"
      />
      <Input
        bind:value={length}
        type="number"
        min="200"
        max="800"
        step="1"
        label="Length in millimeters"
      />
      <Input
        bind:value={headCircumference}
        type="number"
        min="200"
        max="500"
        step="1"
        label="Head circumference in millimeters"
      />
    </Form>
  {:else}
    <button class="btn btn-outline btn-sm" on:click={showForm}>
      Add measurement
    </button>
  {/if}
</DashCard>
