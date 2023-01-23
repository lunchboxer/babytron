<script>
  import { selectedBaby } from '$lib/data/babies.js'
  import BabyName from '$lib/BabyName.svelte'
  import Fa from 'svelte-fa'
  import {
    faPersonPregnant,
    faClipboard,
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

<div class="hero">
  <div class="hero-content text-center text-neutral-content">
    <div class="max-w-md">
      {#if !isFuture($selectedBaby.dueDate)}
        <h1 class="text-5xl font-bold my-8">
          <BabyName baby={$selectedBaby} />
        </h1>

        <div class="alert alert-warning text-3xl shadow-lg">
          <div>
            <Fa icon={faPersonPregnant} />
            <span>
              {Math.abs(daysToEDD($selectedBaby.dueDate))} days overdue
            </span>
          </div>
        </div>
      {:else}
        <h1 class="mb-5 text-6xl font-bold">
          <BabyName baby={$selectedBaby} /> is coming!
        </h1>

        <div class="alert alert-info text-2xl shadow-lg">
          <div>
            <span>
              {Math.abs(daysToEDD($selectedBaby.dueDate))} days left
            </span>
          </div>
        </div>
      {/if}
      <div class="text-base-content">
        <div class="stat">
          <div class="stat-title">Gestational Age</div>
          <div class="stat-value text-2xl">
            {gestationalAgeInWeeksString($selectedBaby.dueDate)}
          </div>
        </div>

        <div class="stat">
          <div class="stat-title">Due Date</div>
          <div class="stat-value text-2xl">
            {toDateString($selectedBaby.dueDate)}
          </div>
          <div class="stat-desc">estimated</div>
        </div>

        {#if isFuture($selectedBaby.dueDate)}
          <div class="stat">
            <div class="stat-title">Progress</div>
            <div class="stat-value text-2xl">
              {percentDone($selectedBaby.dueDate)}%
            </div>
            <div class="stat-desc">
              <progress
                class="progress"
                value={gestationalAgeInDays($selectedBaby.dueDate)}
                max="280"
              />
            </div>
          </div>
        {/if}
      </div>
      <a href="/babies/edit/{$selectedBaby.id}" class="btn gap-2 my-2 lg:my-8">
        <Fa icon={faClipboard} />Record birth
      </a>
    </div>
  </div>
</div>
