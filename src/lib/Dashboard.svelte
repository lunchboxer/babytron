<script>
  import { selectedBaby } from '$lib/data/babies.js'
  import RecordMeasurement from '$lib/RecordMeasurement.svelte'
  import RecordDiaper from '$lib/RecordDiaper.svelte'
  import RecordSleep from '$lib/RecordSleep.svelte'
  import RecordFeeding from '$lib/RecordFeeding.svelte'
  import BabyName from '$lib/BabyName.svelte'
</script>

<h1><BabyName baby={$selectedBaby} /></h1>

<RecordMeasurement baby={$selectedBaby} />
<RecordDiaper baby={$selectedBaby} />
<RecordSleep baby={$selectedBaby} />
<RecordFeeding baby={$selectedBaby} />
