<script>
  import DashCard from '$lib/DashCard.svelte'
  import {
    faCalendarCheck,
    faAngleRight,
    faAngleLeft,
  } from '@fortawesome/free-solid-svg-icons'
  import Error from '$lib/Error.svelte'
  import Milestone from '$lib/Milestone.svelte'
  import Fa from 'svelte-fa'
  import { onMount } from 'svelte'
  import {
    milestones,
    allMonthsAges,
    allCategories,
  } from '$lib/data/milestones.js'
  import { milestoneAchievements } from '$lib/data/milestone-achievements.js'
  import { ageInMonths } from '$lib/data/date-helpers.js'

  export let baby = {}
  export let loading = false
  let errors = ''
  let groupedMilestones
  let selectedAge = closestAge(baby.birthdate)
  $: next = nextAge(selectedAge)
  $: previous = previousAge(selectedAge)

  onMount(async () => {
    loading = true
    try {
      await milestones.get()
      groupedMilestones = groupMilestones($milestones)
      await milestoneAchievements.get(baby.id)
    } catch (error) {
      errors = error
    } finally {
      loading = false
    }
  })

  function groupMilestones(milestones) {
    const groupObject = {}
    for (const age of allMonthsAges) {
      groupObject[age] = milestones.filter((m) => m.monthsAge === age)
    }
    return groupObject
  }

  function extractCategory(milestones, category) {
    const list = milestones.filter((m) => m.category === category)
    return list.sort((a, b) => {
      if (a.id < b.id) return -1
      return 1
    })
  }

  // pick future age only
  function closestAge(birthdate) {
    const months = ageInMonths(birthdate)
    const closest = allMonthsAges.find((age) => age >= months)
    if (!closest) return allMonthsAges[-1]
    return closest
  }
  function nextAge(current) {
    const currentIndex = allMonthsAges.indexOf(current)
    return allMonthsAges[currentIndex + 1]
  }
  function previousAge(current) {
    const currentIndex = allMonthsAges.indexOf(current)
    return allMonthsAges[currentIndex - 1]
  }
  function viewNext() {
    selectedAge = next
  }
  function viewPrevious() {
    selectedAge = previous
  }
</script>

<DashCard title="Milestones" icon={faCalendarCheck}>
  <Error {errors} />
  {#if loading}
    <p>...loading milestones</p>
  {:else}
    <div class="prose text-left w-full">
      <p>Achieved {$milestoneAchievements.length}/{$milestones.length}</p>
      <h3>{selectedAge} months</h3>
      {#each allCategories as category, i}
        <h4>{category.long} milestones</h4>
        {#each extractCategory(groupedMilestones[selectedAge], category.short) as milestone, i}
          <Milestone {milestone} />
        {/each}
      {/each}
      <p class="text-xs">
        These items are what > 75% of children would be expected to reach. Taken
        from <a href="https://www.cdc.gov/ncbddd/actearly/milestones/index.html"
          >www.cdc.gov/ActEarly</a
        >
      </p>
    </div>
    <div class="btn-group grid grid-cols-2 my-4 w-full">
      {#if previous}
        <button class="btn btn-ghost btn-sm gap-2" on:click={viewPrevious}>
          <Fa icon={faAngleLeft} />
          {previous} months
        </button>
      {:else}
        <div />
      {/if}
      <button class="btn btn-ghost btn-sm gap-2" on:click={viewNext}>
        {next} months <Fa icon={faAngleRight} />
      </button>
    </div>
  {/if}
</DashCard>
