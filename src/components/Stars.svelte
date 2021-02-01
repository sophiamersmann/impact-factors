<script>
  import Star from './Star.svelte';

  export let data = [];
</script>

<g class="stars">
  {#each data as d}
    <Star {...d} />
	{/each}
</g>