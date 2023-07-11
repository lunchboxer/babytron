<script>
  import { notifications } from '$lib/notifications/index.js'
  import { babies } from '$lib/data/babies.js'
  import { measurements } from '$lib/data/measurements.js'
  import Form from '$lib/Form.svelte'
  import Input from '$lib/Input.svelte'
  import GenderSelect from '$lib/GenderSelect.svelte'

  let name = ''
  let alternativeName = ''
  let nickname = ''
  let gender = ''
  let birthdate = ''
  let birthTime = ''
  let weight = ''
  let length = ''
  let headCircumference = ''
  let dueDate = ''
  let born = false

  const onSubmit = async () => {
    const newBaby = await babies.create({
      name,
      alternativeName,
      nickname,
      gender,
      birthdate,
      birthTime,
      dueDate,
    })
    notifications.add({
      type: 'success',
      text: 'Added baby successfully.',
    })
    if (born === 'false') return
    const timestamp = new Date(`${birthdate}, ${birthTime}`)
    // then record the measurements one at a time
    if (weight) {
      await measurements.create({
        type: 'weightInGrams',
        value: weight,
        babyId: newBaby.id,
        timestamp,
      })
      notifications.add({
        type: 'success',
        text: 'Recorded birth weight successfully.',
      })
    }
    if (length) {
      await measurements.create({
        type: 'lengthInMillimeters',
        value: length,
        babyId: newBaby.id,
        timestamp,
      })
      notifications.add({
        type: 'success',
        text: 'Recorded birth length successfully.',
      })
    }
    if (headCircumference) {
      await measurements.create({
        type: 'headCircumferenceInMillimeters',
        value: headCircumference,
        babyId: newBaby.id,
        timestamp,
      })
      notifications.add({
        type: 'success',
        text: 'Recorded birth head circumference successfully.',
      })
    }
  }
  const onReset = () => {
    name = ''
    alternativeName = ''
    nickname = ''
    birthdate = ''
    dueDate = ''
    birthTime = ''
    weight = ''
    length = ''
    headCircumference = ''
    gender = ''
    born = undefined
  }
</script>

<h1>Add a baby</h1>

<Form {onSubmit} {onReset} submitLabel="Add baby">
  <Input bind:value={name} label="Name" />
  <Input bind:value={alternativeName} label="Alternative name" />
  <Input
    bind:value={nickname}
    label="Nickname"
    description="What to call the baby while it is unnamed"
  />
  <GenderSelect bind:gender />
  <h3>Current status</h3>
  <div class="form-control w-24">
    <label class="label cursor-pointer">
      <span class="label-text">Born</span>
      <input
        type="radio"
        name="radio-10"
        value={true}
        class="radio"
        bind:group={born}
      />
    </label>
    <label class="label cursor-pointer">
      <span class="label-text">Unborn</span>
      <input
        type="radio"
        name="radio-10"
        value={false}
        class="radio"
        bind:group={born}
      />
    </label>
  </div>

  {#if born}
    <Input bind:value={birthdate} required type="date" label="Birthdate" />
    <Input bind:value={birthTime} type="time" label="Time of birth" />
    <Input
      bind:value={weight}
      type="number"
      min="200"
      max="11000"
      label="Weight at birth (grams)"
      description="2500-4000 is the range for most babies."
    />
    <Input
      bind:value={length}
      type="number"
      min="200"
      max="800"
      step="1"
      label="Length at birth (mm)"
      description="About 500 mm is average."
    />
    <Input
      bind:value={headCircumference}
      type="number"
      min="200"
      max="500"
      step="1"
      label="Head circumference at birth (mm)"
      description="Around 350 mm is average."
    />
  {:else}
    <Input
      bind:value={dueDate}
      type="date"
      label="Expected Delivery Date (EDD)"
    />
  {/if}
</Form>
