<script>
  import Fa from 'svelte-fa'
  import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
  export let title
  export let icon
  let show = false
  const toggleShow = () => {
    show = !show
  }
</script>

<div
  class="card card-bordered my-6 max-w-md shadow-l"
  class:border-primary={show}
>
  <div class="card-body py-4 place-items-center">
    <div
      class="m-0 p-0 cursor-pointer w-full"
      on:keypress={toggleShow}
      on:click={toggleShow}
    >
      <span class="icon mr-2 ">
        <Fa {icon} pull="left" translateY={0.1} />
      </span>
      {title}
      <div class="swap swap-active swap-flip float-right text-sm">
        <div class:swap-off={!show} class:swap-on={show}>
          <Fa icon={faChevronUp} translateY={0.5} />
        </div>
        <div class:swap-off={show} class:swap-on={!show}>
          <Fa icon={faChevronDown} translateY={0.5} />
        </div>
      </div>
    </div>
    {#if show}
      <slot />
    {/if}
  </div>
</div>
