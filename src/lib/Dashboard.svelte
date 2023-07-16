<script>
  import { selectedBaby } from '$lib/data/babies.js'
  import RecordMeasurement from '$lib/RecordMeasurement.svelte'
  import RecordDiaper from '$lib/RecordDiaper.svelte'
  import RecordSleep from '$lib/RecordSleep.svelte'
  import RecordFeeding from '$lib/RecordFeeding.svelte'
  import Milestones from '$lib/Milestones.svelte'
  import RecordMedication from '$lib/RecordMedication.svelte'
  import { ageStringFromBirthdate } from '$lib/data/date-helpers.js'
  import DashboardRefresh from '$lib/DashboardRefresh.svelte'
  import Error from '$lib/Error.svelte'
  let errors = ''
</script>

<h1>Dashboard</h1>
<div class="flex w-full">
  <span class="flex-auto">
    Age: {ageStringFromBirthdate($selectedBaby.birthdate)}
  </span>
  <DashboardRefresh bind:errors />
</div>
<Error {errors} />

<RecordMeasurement baby={$selectedBaby} />
<RecordDiaper baby={$selectedBaby} />
<RecordSleep baby={$selectedBaby} />
<RecordFeeding baby={$selectedBaby} />
<Milestones baby={$selectedBaby} />
<RecordMedication baby={$selectedBaby} />
