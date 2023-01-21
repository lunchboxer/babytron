<script>
  import { page } from '$app/stores'
  import { users } from '$lib/data/users.js'
  import { onMount } from 'svelte'
  import Error from '$lib/Error.svelte'

  let errors = ''
  let user

  onMount(async () => {
    const key = $page.params.id
    try {
      user = await users.get(key)
    } catch (error) {
      errors = error
    }
  })
</script>

<Error {errors} />
{#if user}
  <h1>User - {user.name || user.username}</h1>
{/if}
