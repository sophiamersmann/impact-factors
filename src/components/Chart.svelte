<script>
  import { scalePoint } from 'd3-scale';
  import { pointRadial } from 'd3-shape';

  import Svg from './Svg.svelte';
  import Defs from './Defs.svelte';
  import Center from './Center.svelte';
  import AxisX from './AxisX.svelte';
  import AxisY from './AxisY.svelte';
  import Star from './Star.svelte';

  import { size } from '../stores/dimensions';
  import {
    angleScale,
    skyScale,
    radiusScale,
  } from '../stores/scales';

  export let data = [];

  let renderedData = [];

  $: {
    const dois = data
      .filter((d) => d.show)
      .map((d) => d.doi);
    dois.push('pseudo');
    angleScale.set(scalePoint()
      .domain(dois)
      .range([0, 2 * Math.PI]));
  }

  $: renderedData = data
    .filter((d) => d.show)
    .map((d) => {
      const position = pointRadial(
        $angleScale(d.doi),
        $skyScale(d.citedBy)
      );

      return {
        x: position[0],
        y: position[1],
        r: $radiusScale(d.citedBy),
        data: d,
      };
    });
</script>

<div
  class="visualisation-wrapper"
  style="width: {$size}px; height: {$size}px"
>
  <Svg>
    <Defs />
    <g class="axis">
      <AxisY data={renderedData} />
      <AxisX data={renderedData} />
    </g>
    <g class="stars">
      {#each renderedData as d (d.data.doi)}
        <Star {...d} />
      {/each}
    </g>
    <Center data={renderedData} />
  </Svg>
</div>

<style>
  .visualisation-wrapper {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
</style>