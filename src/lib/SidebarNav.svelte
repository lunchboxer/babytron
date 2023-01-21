<script>
  import { me } from '$lib/data/me.js'
  import { users } from '$lib/data/users.js'
  import { notifications } from '$lib/notifications'
  import { goto } from '$app/navigation'
  import Logo from '$lib/Logo.svelte'
  import Fa from 'svelte-fa'
  import {
    faUsers,
    faAddressCard,
    faPersonThroughWindow,
    faSliders,
  } from '@fortawesome/free-solid-svg-icons'

  export let checked = ''

  const logout = async () => {
    if (!$me?.key) {
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
    {#if $me?.key}
      {#if $me?.isAdmin}
        <li class="m-1 gap-2">
          <a href="/users">
            <Fa icon={faUsers} />
            Users
            {#if $users}
              {#await users.count() then count}
                <div class="badge">{count}</div>
              {/await}
            {/if}
          </a>
        </li>
      {/if}
      <li class="m-1 gap-2">
        <a href="/me">
          <Fa icon={faAddressCard} />
          Profile
        </a>
      </li>
      <li class="m-1 gap-2">
        <a href="/" on:click={logout}>
          <Fa icon={faPersonThroughWindow} />
          Log out
        </a>
      </li>
    {/if}
    <li class="m-1 gap-2">
      <a href="/settings">
        <Fa icon={faSliders} />
        Settings
      </a>
    </li>
  </ul>
</div>
