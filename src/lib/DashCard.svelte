<script>
  import Fa from 'svelte-fa'
  export let title
  export let icon
</script>

<div class="card card-bordered border-secondary my-8 max-w-md shadow-l">
  <div class="card-body pb-8 pt-6 place-items-center">
    <h2 class="my-2">
      <span class="icon mr-2 "><Fa {icon} pull="left" translateY={0.1} /></span>
      {title}
    </h2>
    <slot />
  </div>
</div>
