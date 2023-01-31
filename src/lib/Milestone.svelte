<script>
  import Checkbox from '$lib/Checkbox.svelte'

  export let milestone = {}
</script>

<Checkbox label={milestone.text} />
