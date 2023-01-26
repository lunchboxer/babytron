<script>
  import Fa from 'svelte-fa'
  export let value = false
  export let icon
  export let label
</script>

<div class="form-control w-fit">
  <label class="label cursor-pointer">
    {#if icon}
      <input type="checkbox" check={value} class="checkbox mr-2" />
      <Fa {icon} />
      {#if label}
        <span class="label-text mx-2">{label}</span>
      {/if}
    {:else}
      <input type="checkbox" check={value} class="checkbox" />
      <span class="label-text mx-2">{label}</span>
    {/if}
  </label>
</div>
