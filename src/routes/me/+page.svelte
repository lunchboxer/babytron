<script>
  import { me } from '$lib/data/me.js'
  import { getDateString } from '$lib/data/utils.js'
</script>

<svelte:head>
  <title>User Profile</title>
</svelte:head>

<h1>User Profile</h1>

{#if $me?.id}
  <div class="overflow-x-auto">
    <table class="table w-full">
      <!-- head -->
      <thead>
        <tr>
          <th>Property</th>
          <th>Value</th>
        </tr>
      </thead>
      <!-- body -->
      <tbody>
        <tr>
          <td>name</td>
          <td>{$me.name || '--'}</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>{$me.id}</td>
        </tr>
        <tr>
          <td>username</td>
          <td>{$me.username}</td>
        </tr>
        <tr>
          <td>email</td>
          <td>{$me.email || '--'}</td>
        </tr>
        <tr>
          <td>is admin</td>
          <td>{$me.isAdmin ? 'yes' : 'no'}</td>
        </tr>
        {#if $me.fatherTo?.length > 0}
          <tr>
            <td>father to</td>
            <td />
          </tr>
        {/if}
        {#if $me.motherTo?.length > 0}
          <tr>
            <td>mother to</td>
            <td />
          </tr>
        {/if}
        <tr>
          <td>created</td>
          <td>
            {getDateString($me.createdAt)}
          </td>
        </tr>
        <tr>
          <td>updated</td>
          <td>
            {getDateString($me.updatedAt)}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <a href="users/edit/{$me.id}" class="btn">Edit</a>
{/if}
