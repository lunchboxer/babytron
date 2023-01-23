<script>
  export let baby
</script>

{#if baby}
  {#if baby.name}
    {baby.name} {baby.alternativeName ? `(${baby.alternativeName})` : ''}
  {:else if baby.nickname}
    {baby.nickname}
  {:else}
    Unnamed Baby
  {/if}
{/if}
