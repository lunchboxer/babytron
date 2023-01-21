<script>
  import '../app.css'
  import Header from '$lib/Header.svelte'
  import Login from '$lib/Login.svelte'
  import { NotificationList } from '$lib/notifications'
  import { themeSwitcher, theme } from '$lib/ThemeSwitcher.svelte'
  import { page } from '$app/stores'
  import { me } from '$lib/data/me.js'
  import Loading from '$lib/Loading.svelte'
  import SidebarNav from '$lib/SidebarNav.svelte'

  // sidebar binding
  let checked = ''
  $: themeSwitcher($theme)
</script>

<div class="drawer drawer-mobile">
  <input id="my-drawer" type="checkbox" class="drawer-toggle" bind:checked />
  <div class="drawer-content flex flex-col">
    <Header />

    <div class="container prose mx-auto px-4 py-4 mt-20">
      {#if !$me?.key && $page.url.pathname !== '/settings'}
        <Login />
      {:else if $me?.key || $page.url.pathname === '/settings'}
        <slot />
      {/if}
    </div>
  </div>
  <SidebarNav bind:checked />
</div>

<NotificationList />
<Loading />
