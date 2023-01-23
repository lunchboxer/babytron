<script>
  import Form from '$lib/Form.svelte'
  import Input from '$lib/Input.svelte'
  import { me } from '$lib/data/me.js'
  import { users } from '$lib/data/users.js'
  import { notifications } from '$lib/notifications/index.js'

  export let userId
  let oldPassword = ''
  let newPassword = ''

  const onSubmit = async () => {
    await users.changePassword(userId, oldPassword, newPassword)
    notifications.add({
      type: 'success',
      text: 'Changed password successfully.',
    })
  }
  const onReset = () => {
    oldPassword = ''
    newPassword = ''
  }
</script>

<h2>Change Password</h2>

<Form {onSubmit} {onReset} submitLabel="Save changes">
  {#if !$me.isAdmin}
    <Input
      type="password"
      bind:value={oldPassword}
      label="Old Password"
      required
    />
  {/if}
  <Input
    type="password"
    bind:value={newPassword}
    label="New Password"
    required
  />
</Form>
