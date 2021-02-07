<script>
  import Svg from './Svg.svelte';
  import Defs from './Defs.svelte';
  import Star from './Star.svelte';

  import { radiusScale } from '../stores/scales';

  const size = 40;

  let legendItems = [];
  
  $: legendItems = [1, 10, 100, 1000]
    .map((citedBy) => ({
      citedBy,
      radius: $radiusScale ? $radiusScale(citedBy) : 0,
    }));
</script>

<div class="legend">
  {#each legendItems as { citedBy }}
    <div class="label">{citedBy}</div>
  {/each}
  {#each legendItems as { radius, citedBy }}
    <div class="marker">
      <Svg {size}>
        <Defs />
        <Star r={radius} />
      </Svg>
    </div>
  {/each}
</div>

<style>
  .legend {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    align-items: center;
  }
</style>