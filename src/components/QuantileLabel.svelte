<script>
  import { format as d3Format } from 'd3-format';

  import { activeQuantile } from '../stores/selections';

  import Label from './Label.svelte';
  import Arrow from './Arrow.svelte';

  export let id = 0;
  export let q = 0;
  export let radius = 0;
  export let nStars = 0;
  export let nBrightStars = 0;

  let nExcludedStars = 0;

  const format = q > 0.99 ? d3Format('.1%') : d3Format('.0%');
  const arrowLength = 18;

  $: nExcludedStars = nStars - nBrightStars;
</script>

{#if q === $activeQuantile}
  <g class="quantile-label">
    <g>
      <Arrow
        x="0"
        y={-radius}
        length={arrowLength}
        orient="up"
        animate
      />
      <Label
        pathId="path-quantile-label-upper-{id}"
        {radius}
        angle="0"
      >
        <tspan>{nExcludedStars} of {nStars}</tspan>
        articles excluded
        <tspan>({format(1-q)})</tspan>
      </Label>
    </g>
  </g>
{/if}

<style>
  tspan {
    font-weight: bold;
  }

  .quantile-label :global(.arrow) {
    stroke: var(--gray);
  }

  .quantile-label :global(.label text) {
    opacity: 1;
  }
</style>