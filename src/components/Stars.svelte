<script>
  import Star from './Star.svelte';

  export let data = [];
</script>

<g class="stars">
  {#each data as d (d.data.doi)}   
    <Star
      x={d.x}
      y={d.y}
      r={d.r}
      data={d.data}
    />
  {/each}
</g>
