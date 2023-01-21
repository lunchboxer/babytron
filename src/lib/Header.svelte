<script>
  import { me } from '$lib/data/me.js'
  import Logo from '$lib/Logo.svelte'
  import MenuHamburgerIcon from '$lib/icons/MenuHamburgerIcon.svelte'
</script>

<nav class="navbar bg-base-100 lg:hidden">
  {#if $me?.key}
    <div class="flex-none">
      <label for="my-drawer" class="btn btn-square btn-ghost drawer-button">
        <MenuHamburgerIcon />
      </label>
    </div>
  {/if}
  <div class="w:100">
    <Logo />
  </div>
</nav>

<style>
  nav {
    position: fixed;
    z-index: 99;
  }
</style>
