<script>
  import Star from './Star.svelte';

  export let data = [];
</script>

<g class="stars">
  {#each data as d}
    <Star
      x={d.x}
      y={d.y}
      r={d.r}
      bright={d.bright}
    />
	{/each}
</g>