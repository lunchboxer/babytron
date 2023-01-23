<script>
  import { me } from '$lib/data/me.js'
  import { selectedBaby } from '$lib/data/babies.js'
  import Logo from '$lib/Logo.svelte'
  import MenuHamburgerIcon from '$lib/icons/MenuHamburgerIcon.svelte'
  import BabyName from '$lib/BabyName.svelte'
</script>

<nav class="navbar bg-base-100 lg:hidden shadow">
  {#if $me?.id}
    <div class="flex-none">
      <label for="my-drawer" class="btn btn-square btn-ghost drawer-button">
        <MenuHamburgerIcon />
      </label>
    </div>
  {/if}
  <div class="w:100">
    <Logo />
    {#if $selectedBaby?.id}
      <div class="badge badge-primary m-2">
        <BabyName baby={$selectedBaby} />
      </div>
    {/if}
  </div>
</nav>

<style>
  nav {
    position: fixed;
    z-index: 99;
  }
</style>
