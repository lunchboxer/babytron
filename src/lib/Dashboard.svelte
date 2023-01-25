<script>
  import { selectedBaby } from '$lib/data/babies.js'
  import RecordMeasurement from '$lib/RecordMeasurement.svelte'
  import Stats from '$lib/Stats.svelte'
  import BabyName from '$lib/BabyName.svelte'
</script>

<h1>Dashboard</h1>
<h2><BabyName baby={$selectedBaby} /></h2>

<Stats baby={$selectedBaby} />

<RecordMeasurement baby={$selectedBaby} />
