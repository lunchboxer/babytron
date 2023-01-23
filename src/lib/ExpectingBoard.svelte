<script>
  import { selectedBaby } from '$lib/data/babies.js'
  import BabyName from '$lib/BabyName.svelte'
  import Fa from 'svelte-fa'
  import {
    faClipboard,
    faPersonPregnant,
  } from '@fortawesome/free-solid-svg-icons'
  import {
    gestationalAgeInDays,
    gestationalAgeInWeeksString,
    daysToEDD,
    isFuture,
  } from '$lib/data/date-helpers.js'

  const percentDone = (dueDate) => {
    const portion = gestationalAgeInDays(dueDate) / 280
    return Math.round(portion * 100)
  }
  const toDateString = (date) => {
    const dateObject = new Date(date)
    return dateObject.toDateString()
  }
</script>

<div class="hero py-8">
  <div class="hero-content text-center text-neutral-content">
    <div class="max-w-md">
      <h1 class="mb-5 text-5xl font-bold">
        {#if !isFuture($selectedBaby.dueDate)}
          <p>
            <BabyName baby={$selectedBaby} />
          </p>

          <div class="alert alert-warning shadow-lg">
            <div>
              <Fa icon={faPersonPregnant} />
              <span>
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
