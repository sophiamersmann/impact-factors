<script>
  import { extent } from 'd3-array';
  import { scaleSqrt } from 'd3-scale';
  import { pointRadial } from 'd3-shape';

  import Svg from './Svg.svelte';
  import Defs from './Defs.svelte';
  import Center from './Center.svelte';
  import AxisX from './AxisX.svelte';
  import AxisY from './AxisY.svelte';
  import Star from './Star.svelte';

  import {
    size,
    starRadius,
    innerRadius,
    outerRadius
  } from '../stores/dimensions';
  import {
    angleScale,
    skyScale
  } from '../stores/scales';

  import setDimScales from '../utils/scales';

  export let data = [];

  let renderedData = [];
  let brightData = [];
  let radiusScale;
  let maxValue = Infinity;

  $: setDimScales(data, $innerRadius, $outerRadius);

  $: radiusScale = scaleSqrt()
    .domain(extent(data, d => d.citedBy))
    .range([$starRadius.min, $starRadius.max]);

  $: renderedData = data.map((d) => {
    const position = pointRadial(
      $angleScale(d.location),
      $skyScale(d.citedBy)
    );

    return {
      x: position[0],
      y: position[1],
      r: radiusScale(d.citedBy),
      data: d,
      bright: d.citedBy < maxValue,
    };
  });

  $: brightData = renderedData.filter((d) => d.bright);

  function updateStarBrightness(event) {
    maxValue = event.detail.maxValue;
  }
</script>

<div
  class="visualisation-wrapper"
  style="width: {$size}px; height: {$size}px"
>
  <Svg>
    <Defs />
    <g class="axis">
      <AxisY
        data={renderedData}
        {maxValue}
        on:darkenSky={updateStarBrightness} />
      <AxisX data={renderedData} />
    </g>
    <g class="stars">
      {#each renderedData as d}
        <Star {...d} />
      {/each}
    </g>
    <Center data={brightData} />
  </Svg>
</div>

<style>
  .visualisation-wrapper {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
</style>