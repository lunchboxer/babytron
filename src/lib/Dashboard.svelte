<script>
  import { selectedBaby } from '$lib/data/babies.js'
  import BabyName from '$lib/BabyName.svelte'
  import Fa from 'svelte-fa'
  import {
    faClipboard,
    faPersonPregnant,
    faHourglassHalf,
  } from '@fortawesome/free-solid-svg-icons'
  import { subDays, differenceInCalendarDays } from 'date-fns'

  const gestationalAgeInDays = (dueDate) => {
    // take dueDate and find date 280 days before
    const date = new Date(dueDate)
    const dayZero = subDays(date, 280)
    // get today's date
    const today = new Date()
    // return difference in days
    return differenceInCalendarDays(today, dayZero)
  }
  const gestationalAgeInWeeksString = (dueDate) => {
    const inDays = gestationalAgeInDays(dueDate)
    const weeks = Math.trunc(inDays / 7)
    const andDays = inDays % 7
    return `${weeks} weeks and ${andDays} days`
  }
  const daysToEDD = (dueDate) => {
    const targetDate = new Date(dueDate)
    const today = new Date()
    return differenceInCalendarDays(targetDate, today)
  }

  const isFuture = (date) => {
    const today = new Date()
    return today <= new Date(date)
  }

  const percentDone = (dueDate) => {
    const portion = gestationalAgeInDays(dueDate) / 280
    return Math.round(portion * 100)
  }
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<h1>Dashboard</h1>
<h2><BabyName baby={$selectedBaby} /></h2>

{#if !$selectedBaby.birthdate}
  {#if !isFuture($selectedBaby.dueDate)}
    <div class="alert alert-warning shadow-lg">
      <div>
        <Fa icon={faPersonPregnant} />
        <span>{Math.abs(daysToEDD($selectedBaby.dueDate))} days overdue</span>
      </div>
    </div>
  {:else}
    <div class="alert alert-info shadow-lg">
      <div>
        <Fa icon={faHourglassHalf} />
        <span>
          {Math.abs(daysToEDD($selectedBaby.dueDate))} days to go
        </span>
      </div>
    </div>
  {/if}
  <p>Still waiting for this baby to arrive.</p>
  {#if $selectedBaby.dueDate}
    <p>Gestational Age: {gestationalAgeInWeeksString($selectedBaby.dueDate)}</p>
    <p>Due: {$selectedBaby.dueDate}</p>
    {#if isFuture($selectedBaby.dueDate)}
      <p>Progress: {percentDone($selectedBaby.dueDate)}%</p>
      <progress
        class="progress progress-secondary"
        value={gestationalAgeInDays($selectedBaby.dueDate)}
        max="280"
      />
    {/if}
  {/if}
  <button class="btn gap-2 my-4"><Fa icon={faClipboard} />Record birth</button>
{/if}
