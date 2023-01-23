<script>
  import { babies } from '$lib/data/babies.js'
  import Error from '$lib/Error.svelte'
  import { notifications } from '$lib/notifications'

  export let baby = {}
  let errors

  const unbirth = async () => {
    try {
      await babies.unbirth(baby.id)
      notifications.add({
        type: 'success',
        text: 'Successfully marked baby as unborn.',
      })
    } catch (error) {
      errors = error
    }
  }
</script>

<h2>Mark baby as not born yet</h2>
<Error {errors} />
<p>Perhaps, you added the birthdate by mistake?</p>

<button on:click={unbirth} class="btn">Mark unborn</button>
