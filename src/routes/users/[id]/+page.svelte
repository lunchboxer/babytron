<script>
  import Error from '$lib/Error.svelte'
  import { users } from '$lib/data/users.js'

  export let data = {}
  const { errors, loadUser } = data
  users.updateOne(loadUser)
  $: user = $users.find((u) => u.id === loadUser.id)
</script>

<Error {errors} />
{#if user}
  <h1>User - {user.name || user.username}</h1>
{/if}
