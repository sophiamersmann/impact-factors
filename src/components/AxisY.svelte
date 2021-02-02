<script>
  import QuantileLine from './QuantileLine.svelte';

  export let quantiles = [];
</script>

<g class="axis axis-y">
  {#each quantiles as quantile}
    <QuantileLine
      radius={quantile.radius}
      selected={quantile.selected}
    />
	{/each}
</g>