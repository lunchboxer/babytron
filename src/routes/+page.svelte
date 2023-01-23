<script>
  import { babies, selectedBaby } from '$lib/data/babies.js'
  import AddBaby from '$lib/AddBaby.svelte'
  import BabySelect from '$lib/BabySelect.svelte'
  import Dashboard from '$lib/Dashboard.svelte'
  import ExpectingBoard from '$lib/ExpectingBoard.svelte'
</script>

<svelte:head>
  <title>Babytron</title>
</svelte:head>

{#if $babies?.length === 0}
  <h1>Oh no!</h1>
  <p>
    Babytron requires babies, but there are no babies currently in the database.
  </p>
  <AddBaby />
{:else if !$selectedBaby}
  <h1>Oops! no baby chosen yet.</h1>
  <BabySelect />
{:else if !$selectedBaby?.birthdate}
  <ExpectingBoard />
{:else}
  <Dashboard />
{/if}
