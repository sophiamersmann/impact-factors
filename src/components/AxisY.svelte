<script>
  import AxisLine from './AxisLine.svelte';

  export let quantiles = [];
</script>

<g class="axis axis-y">
  {#each quantiles as quantile}
    <AxisLine
      radius={quantile.radius}
      selected={quantile.selected}
    />
	{/each}
</g>