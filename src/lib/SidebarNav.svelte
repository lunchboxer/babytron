<script>
  import { me } from '$lib/data/me.js'
  import { babies } from '$lib/data/babies.js'
  import { userCount } from '$lib/data/users.js'
  import { notifications } from '$lib/notifications'
  import { goto } from '$app/navigation'
  import Logo from '$lib/Logo.svelte'
  import NavItem from '$lib/NavItem.svelte'
  import {
    faPoo,
    faUsers,
    faAddressCard,
    faPersonThroughWindow,
    faSliders,
    faBaby,
  } from '@fortawesome/free-solid-svg-icons'

  export let checked = ''

  const logout = async () => {
    if (!$me?.id) {
      notifications.add({
        text: 'Cannot log out. User not logged in.',
        type: 'error',
      })
      return
    }
    const username = $me.username
    await me.logout()
    notifications.add({
      text: `Logged out ${username}`,
      type: 'success',
    })
    goto('/')
  }
</script>

<div class="drawer-side">
  <label for="my-drawer" class="drawer-overlay" />
  <ul
    class="menu p-4 overflow-y-auto w-64 bg-base-300 text-base-content"
    on:keypress={() => {
      checked = ''
    }}
    on:click={() => {
      checked = ''
    }}
  >
    <Logo />
    <div class="divider" />
    <!-- Sidebar content here -->
    {#if $me?.id}
      <NavItem
        count={$babies?.length}
        icon={faBaby}
        label="Babies"
        url="/babies"
      />
      {#if $babies?.length}
        <NavItem icon={faPoo} label="Diapers" url="/diapers" />
      {/if}
      {#if $me?.isAdmin}
        <NavItem count={$userCount} icon={faUsers} label="Users" url="/users" />
      {/if}
      <NavItem icon={faAddressCard} label="Profile" url="/me" />
      <NavItem icon={faPersonThroughWindow} label="Log out" action={logout} />
    {/if}
    <NavItem icon={faSliders} label="Settings" url="/settings" />
  </ul>
</div>
