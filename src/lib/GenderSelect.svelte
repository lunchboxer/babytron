<script>
  export let gender = ''
</script>

<h3>Gender</h3>
<div class="form-control w-24">
  <label class="label cursor-pointer">
    <span class="label-text">Unknown</span>
    <input
      type="radio"
      bind:group={gender}
      name="gender"
      checked
      value={null}
      class="radio"
    />
  </label>
  <label class="label cursor-pointer">
    <span class="label-text">Male</span>
    <input
      type="radio"
      bind:group={gender}
      name="gender"
      value="M"
      class="radio"
    />
  </label>

  <label class="label cursor-pointer">
    <span class="label-text">Female</span>
    <input
      type="radio"
      bind:group={gender}
      name="gender"
      value="F"
      class="radio"
    />
  </label>
</div>
