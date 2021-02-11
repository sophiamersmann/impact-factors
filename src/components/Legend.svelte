<script>
  import Svg from './Svg.svelte';
  import Defs from './Defs.svelte';
  import Star from './Star.svelte';

  import { radiusScale } from '../stores/scales';

  import {
    legendTicks,
    intenseBrightnessThreshold
  } from '../inputs/constants';

  const size = 40;

  let legendItems = [];
  
  $: legendItems = legendTicks
    .map((citedBy) => ({
      citedBy,
      radius: $radiusScale ? $radiusScale(citedBy) : 0,
    }));
</script>

<div class="legend">
  {#each legendItems as { citedBy, radius }}
    <div class="marker">
      <Svg {size}>
        <Defs />
        <Star r={radius} intense={citedBy >= intenseBrightnessThreshold} />
      </Svg>
    </div>
  {/each}
  {#each legendItems as { citedBy }}
    <div class="label">{citedBy}</div>
  {/each}
</div>

<style>
  .legend {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    align-items: center;
    font-size: 0.8rem;
    opacity: 0.95;
  }
</style>