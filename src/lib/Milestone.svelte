<script>
  import { selectedBaby } from '$lib/data/babies.js'
  import { milestoneAchievements } from '$lib/data/milestone-achievements.js'

  export let milestone = {}

  let loading = false
  let errors = ''

  $: achievement = $milestoneAchievements.find(
    (a) => a.milestone.id === milestone.id,
  )
  $: checked = !!achievement
  const toggle = async () => {
    loading = true
    try {
      achievement
        ? await milestoneAchievements.unachieve(achievement.id)
        : await milestoneAchievements.achieve($selectedBaby.id, milestone.id)
    } catch (error) {
      errors = error
    } finally {
      loading = false
    }
  }
</script>

<div class="form-control w-fit">
  <label class:cursor-pointer={!loading} class="label">
    <input
      type="checkbox"
      bind:checked
      disabled={loading}
      on:change={toggle}
      class="checkbox checkbox-success mr-2"
    />
    <span class="label-text" class:text-gray-500={loading}>
      {milestone.text}
    </span>
  </label>
</div>
