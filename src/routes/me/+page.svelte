<script>
  import { me } from '$lib/data/me.js'
</script>

<svelte:head>
  <title>User Profile</title>
</svelte:head>

<h1>User Profile</h1>

{#if $me?.key}
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
          <td>{$me.key}</td>
        </tr>
        <tr>
          <td>username</td>
          <td>{$me.username}</td>
        </tr>
        <tr>
          <td>email</td>
          <td>{$me.email || '--'}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <a href="users/edit/{$me.key}" class="btn">Edit</a>
{/if}
