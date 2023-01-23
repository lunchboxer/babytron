<script>
  import { notifications } from '$lib/notifications/index.js'
  import { babies } from '$lib/data/babies.js'
  import Form from '$lib/Form.svelte'
  import Input from '$lib/Input.svelte'
  import GenderSelect from '$lib/GenderSelect.svelte'

  let name = ''
  let alternativeName = ''
  let gender = ''
  let birthdate = ''
  let dueDate = ''

  const onSubmit = async () => {
    await babies.create({ name, alternativeName, gender, birthdate, dueDate })
    notifications.add({
      type: 'success',
      text: 'Added baby successfully.',
    })
  }
  const onReset = () => {
    name = ''
    alternativeName = ''
    birthdate = ''
    dueDate = ''
    gender = ''
  }
</script>

<h2>Add a baby</h2>

<Form {onSubmit} {onReset} submitLabel="Add this baby">
  <Input bind:value={name} label="Name" />
  <Input bind:value={alternativeName} label="Alternative name" />
  <Input bind:value={birthdate} type="date" label="Birthdate" />
  <Input
    bind:value={dueDate}
    type="date"
    label="Expected Delivery Date (EDD)"
  />
  <GenderSelect bind:gender />
</Form>
