<script>
  export let baby
</script>

{#if baby}
  {#if baby.name}
    {baby.name} {baby.alternativeName ? `(${baby.alternativeName})` : ''}
  {:else}
    Unnamed Baby
  {/if}
{/if}
