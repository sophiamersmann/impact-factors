<script>
  import QuantileLabel from './QuantileLabel.svelte';

  export let quantiles = [];
  export let nStars = 0;
  export let nBrightStars = 0;
</script>

<g class="quantile-labels">
  {#each quantiles.slice(1) as quantile, i}
    <QuantileLabel
      id={i}
      q={quantile.q}
      radius={quantile.radius}
      {nStars}
      {nBrightStars} />
  {/each}
</g>
