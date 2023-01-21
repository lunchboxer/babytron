<script>
  import EditButton from '$lib/EditButton.svelte'
  export let user = {}
</script>

<tr>
  <td>
    <a href="/users/{user.key}">
      {user.username}
    </a>
  </td>
  <td>
    {user.name || '--'}
  </td>
  <td>
    <EditButton url="/users/edit/{user.key}" />
  </td>
</tr>
