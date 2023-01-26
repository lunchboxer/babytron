<script>
  import Input from '$lib/Input.svelte'
  import Form from '$lib/Form.svelte'
  import { measurements } from '$lib/data/measurements.js'
  import { notifications } from '$lib/notifications'

  export let baby = {}
  let weight
  let length
  let headCircumference

  const onReset = () => {
    weight = ''
    length = ''
    headCircumference = ''
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
  }
</script>

<h2>Record Measurements</h2>

<Form {onSubmit} {onReset} submitLabel="Record Measurements">
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
