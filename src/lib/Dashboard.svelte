<script>
  import { selectedBaby } from '$lib/data/babies.js'
  import BabyName from '$lib/BabyName.svelte'
  import Fa from 'svelte-fa'
  import {
    faClipboard,
    faPersonPregnant,
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
  const toDateString = (date) => {
    const dateObject = new Date(date)
    return dateObject.toDateString()
  }
</script>

{#if $selectedBaby?.birthdate}
  <h1>Dashboard</h1>
  <h2><BabyName baby={$selectedBaby} /></h2>
{:else}
  <div class="hero py-8">
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold">
          {#if !isFuture($selectedBaby.dueDate)}
            <div class="alert alert-warning shadow-lg">
              <div>
                <Fa icon={faPersonPregnant} size="2x" />
                <span>
                  <BabyName baby={$selectedBaby} />
                  <br />
                  {Math.abs(daysToEDD($selectedBaby.dueDate))} days overdue
                </span>
              </div>
            </div>
          {:else}
            <BabyName baby={$selectedBaby} /> is coming in {daysToEDD(
              $selectedBaby.dueDate,
            )} days
          {/if}
        </h1>
        <h3>
          Gestational Age: {gestationalAgeInWeeksString($selectedBaby.dueDate)}
        </h3>
        <h3>Due: {toDateString($selectedBaby.dueDate)}</h3>
        {#if isFuture($selectedBaby.dueDate)}
          <h3>Progress: {percentDone($selectedBaby.dueDate)}%</h3>
          <progress
            class="progress progress-secondary border"
            value={gestationalAgeInDays($selectedBaby.dueDate)}
            max="280"
          />
        {/if}
        <button class="btn gap-2 mt-10">
          <Fa icon={faClipboard} />Record birth
        </button>
      </div>
    </div>
  </div>
{/if}
