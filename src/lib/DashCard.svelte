<script>
  export let title
</script>

<div class="card card-bordered my-4 bg-base-100 shadow-l">
  <div class="card-body py-4">
    <h2 class="my-2">
      {title}
    </h2>
    <slot />
  </div>
</div>
