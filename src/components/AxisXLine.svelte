<script>
  import { pointRadial } from 'd3-shape';

  import { innerRadius, outerRadius } from '../stores/dimensions';
  import { angleScale } from '../stores/scales';

  export let location = '';

  const lineOffset = 10;

  let from = [];
  let to = [];

  $: from = pointRadial($angleScale(location), $innerRadius - lineOffset);
  $: to = pointRadial($angleScale(location), $outerRadius);
</script>

<line
  class="axis-line"
  x1={from[0]}
  y1={from[1]}
  x2={to[0]}
  y2={to[1]} />

<style>
  line {
    stroke: #ddd;
    stroke-opacity: 0.15;
    stroke-dasharray: 3;
    pointer-events: none;
  }
</style>
  