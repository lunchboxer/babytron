<script>
  import { selectedBaby } from '$lib/data/babies.js'
  import { milestoneAchievements } from '$lib/data/milestone-achievements.js'
  import { notifications } from '$lib/notifications'

  export let milestone = {}

  let loading = false

  $: achievement = $milestoneAchievements.find(
    (a) => a.milestone.id === milestone.id,
  )
  $: checked = !!achievement

  const toggle = async () => {
    loading = true
    try {
      if (achievement) {
        await milestoneAchievements.unachieve(achievement.id)
        notifications.add({
          type: 'success',
          text: 'Milestone achievement removed',
        })
      } else {
        await milestoneAchievements.achieve($selectedBaby.id, milestone.id)
        notifications.add({
          type: 'success',
          text: 'Milestone achievement recorded',
        })
      }
    } catch (error) {
      console.error(error)
      notifications.add({
        type: 'success',
        text: 'Milestone record failed',
      })
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
