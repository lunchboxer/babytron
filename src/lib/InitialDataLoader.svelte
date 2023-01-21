<script>
  import { onMount } from 'svelte'
  import { page } from '$app/stores'
  import { me } from '$lib/data/me.js'
  import { userCount } from '$lib/data/users.js'

  export let ready = false
  export let data = {}
  onMount(async () => {
    // this could be optimized into one call
    me.set($page.data.me)
    userCount.set(data.userCount)
    ready = true
  })
</script>
