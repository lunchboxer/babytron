<script>
  import { navigating } from '$app/stores'
  import { fade } from 'svelte/transition'
</script>

{#if $navigating}
  <div class="overlay" transition:fade|global>
    <div class="overlay__inner">
      <div class="overlay__content">
        <div class="double">
          <div class="double-bounce1" />
          <div class="double-bounce2" />
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .overlay {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    background: hsl(var(--b1));
    z-index: 99;
  }

  .overlay__inner {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .overlay__content {
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .double {
    width: 90px;
    height: 90px;
    position: relative;
    margin: 100px auto;
  }

  .double-bounce1,
  .double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: hsl(var(--p));
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    animation: sk-bounce 2s infinite ease-in-out;
  }

  .double-bounce2 {
    animation-delay: -1s;
  }

  @keyframes sk-bounce {
    0%,
    100% {
      transform: scale(0);
    }
    50% {
      transform: scale(1);
    }
  }
</style>
