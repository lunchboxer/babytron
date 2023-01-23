<script>
  import DeleteThing from '$lib/DeleteThing.svelte'
  import { babies } from '$lib/data/babies.js'
  import { notifications } from '$lib/notifications'
  import { goto } from '$app/navigation'
  import Error from '$lib/Error.svelte'
  import Form from '$lib/Form.svelte'
  import Input from '$lib/Input.svelte'
  import GenderSelect from '$lib/GenderSelect.svelte'

  export let data = {}
  const { errors, loadBaby } = data
  babies.updateOne(loadBaby)
  $: baby = $babies && $babies.find((b) => b?.id === loadBaby?.id)

  const onSubmit = async () => {
    await babies.patch(baby)
    notifications.add({
      type: 'success',
      text: 'Saved baby info successfully.',
    })
    goto('/babies')
  }
  const onReset = () => {
    babies.updateOne({ ...loadBaby })
  }
</script>

<h1>Edit baby info</h1>

<Error {errors} />

{#if baby}
  <Form {onSubmit} {onReset} submitLabel="Save changes">
    <Input bind:value={baby.name} label="Name" />
    <Input bind:value={baby.alternativeName} label="Alternative name" />
    <Input bind:value={baby.birthdate} type="date" label="Birthdate" />
    <Input
      bind:value={baby.dueDate}
      type="date"
      label="Expected Delivery Date (EDD)"
    />
    <GenderSelect bind:gender={baby.gender} />
  </Form>
  <DeleteThing
    thingName="this baby record"
    deleteFunction={() => {
      babies.remove(baby.id)
    }}
    referrer="/babies"
  />
{/if}
