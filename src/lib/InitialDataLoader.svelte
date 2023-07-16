<script>
  import { onMount } from 'svelte'
  import { me } from '$lib/data/me.js'
  import { babies } from '$lib/data/babies.js'
  import { userCount } from '$lib/data/users.js'

  export let ready = false
  export let data = {}
  onMount(async () => {
    // this could be optimized into one call
    me.set(data.me)
    babies.set(data.babies)
    userCount.set(data.userCount)
    ready = true
  })
</script>
