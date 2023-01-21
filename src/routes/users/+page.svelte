<script>
  import { users } from '$lib/data/users.js'
  import { me } from '$lib/data/me.js'
  import Error from '$lib/Error.svelte'
  import AddUser from './_AddUser.svelte'
  import UserRow from './_UserRow.svelte'
</script>

<h1>Users</h1>

{#if $me?.isAdmin}
  {#await users.get()}
    <p>...getting users</p>
  {:then}
    {#if $users}
      {#if $users.length > 0}
        {$users.length} users
        <div class="overflow-x-auto w-full">
          <table class="table table-zebra w-full">
            <thead>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {#each $users as user}
                <UserRow {user} />
              {/each}
            </tbody>
          </table>
        </div>
      {:else}
        <p>There are no users somehow.</p>
      {/if}
    {/if}
  {:catch errors}
    <Error {errors} />
  {/await}
  <AddUser />
{/if}
