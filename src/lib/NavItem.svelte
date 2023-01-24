<script>
  import Fa from 'svelte-fa'
  import { page } from '$app/stores'
  export let icon
  export let label = ''
  export let count
  export let url = '/'
  export let action

  // mark link active if we are in any subdirectories
  $: active = '/' + $page.route?.id?.split('/')[1] === url
</script>

<li class="m-1" class:gap-2={icon}>
  {#if action}
    <button on:click={action}>
      <Fa {icon} />
      {label}
      {#if count !== undefined}
        <div class="badge badge-outline">{count}</div>
      {/if}
    </button>
  {:else}
    <a href={url} class:active>
      <Fa {icon} />
      {label}
      {#if count !== undefined}
        <div class="badge badge-outline">{count}</div>
      {/if}
    </a>
  {/if}
</li>
