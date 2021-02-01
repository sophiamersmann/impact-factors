<script>
  import Star from './Star.svelte';

  export let data = [];
</script>

<g>
  {#each data as d}
    <Star
      x={d.x}
      y={d.y}
      r={d.r}
    />
	{/each}
</g>