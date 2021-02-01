<script>
  import { interpolateNumber, interpolateLab } from 'd3-interpolate';

  import { tweened } from 'svelte/motion';

  import {
    axisLine as lineColor,
    selectedAxisLine as selectedLineColor
  } from '../inputs/colors';

  export let radius = 0;
  export let selected = false;

  const duration = 200;
  const color = tweened(lineColor, {
    duration,
    interpolate: interpolateLab,
  });
  const opacity = tweened(0.2, {
    duration,
    interpolate: interpolateNumber,
  })

  $: color.set(selected ? selectedLineColor : lineColor);
  $: opacity.set(selected ? 1 : 0.2);
</script>

<circle
  class="axis-line"
  cx="0"
  cy="0"
  r={radius}
  stroke={$color}
  stroke-opacity={$opacity}
/>

<style>
  circle {
    fill: none;
    pointer-events: none;
  }
</style>