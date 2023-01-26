<script>
  import { notifications } from '$lib/notifications/index.js'
  import { users } from '$lib/data/users.js'
  import { goto } from '$app/navigation'
  import Input from '$lib/Input.svelte'
  import Form from '$lib/Form.svelte'
  import Error from '$lib/Error.svelte'
  import Checkbox from '$lib/Checkbox.svelte'
  import DeleteThing from '$lib/DeleteThing.svelte'
  import ChangePassword from '$lib/ChangePassword.svelte'
  import { faToolbox } from '@fortawesome/free-solid-svg-icons'

  export let data = {}
  const { errors, loadUser } = data
  users.updateOne(loadUser)
  $: user = $users.find((u) => u.id === loadUser.id)

  const onSubmit = async () => {
    await users.patch(user)
    notifications.add({
      type: 'success',
      text: `Saved user ${user.username}`,
    })
    goto('/users')
  }
  const onReset = () => {
    users.updateOne({ ...loadUser })
  }
</script>

<h1>Edit User</h1>
<Error {errors} />

{#if user}
  <Form {onSubmit} {onReset} submitLabel="Save changes">
    <Input bind:value={user.username} label="Username" required />
    <Input bind:value={user.name} label="Name" />
    <Input bind:value={user.email} label="Email address" type="email" />
    <Checkbox bind:value={user.isAdmin} label="is admin" icon={faToolbox} />
    <input hidden value={user.id} name="id" />
  </Form>

  <ChangePassword userId={user.id} />

  <DeleteThing
    thingName="User {user.username}"
    deleteFunction={() => {
      users.remove(user.id)
    }}
    referrer="/users"
    heading
  />
{/if}
