<script>
  import Fa from 'svelte-fa'
  import {
    faPoo,
    faWeightScale,
    faRuler,
    faPersonBreastfeeding,
  } from '@fortawesome/free-solid-svg-icons'
  export let baby = {}
</script>

<div class="stats stats-vertical w-auto sm:stats-horizontal shadow">
  <div class="stat">
    <div class="stat-figure text-secondary">
      <Fa icon={faPoo} size="2x" />
    </div>
    <div class="stat-title">Diapers</div>
    <div class="stat-value">687</div>
    <div class="stat-desc">Average 6.8/day</div>
  </div>

  <div class="stat">
    <div class="stat-figure text-secondary">
      <Fa icon={faPersonBreastfeeding} size="2x" />
    </div>
    <div class="stat-title">Last fed</div>
    <div class="stat-value">45 min</div>
    <div class="stat-desc">212 minutes today</div>
  </div>
</div>
