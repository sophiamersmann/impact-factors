<script>
  import {
    axisLine as lineColor,
    selectedAxisLine as selectedLineColor
  } from '../inputs/colors';

  export let radius = 0;
  export let selected = false;
</script>

<circle
  class="axis-line"
  cx="0"
  cy="0"
  r={radius}
  stroke={selected ? selectedLineColor : lineColor}
  stroke-opacity={selected ? 1 : 0.2}
/>

<style>
  circle {
    fill: none;
    pointer-events: none;
  }
</style>