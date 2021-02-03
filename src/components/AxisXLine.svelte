<script>
  import { pointRadial } from 'd3-shape';

  import { innerRadius, outerRadius } from '../stores/dimensions';
  import { angleScale } from '../stores/scales';

  export let doi = '';

  const lineOffset = 10;

  let from = [];
  let to = [];

  $: from = pointRadial($angleScale(doi), $innerRadius - lineOffset);
  $: to = pointRadial($angleScale(doi), $outerRadius);
</script>

{#if from[0]}
  <line
    class="axis-line"
    x1={from[0]}
    y1={from[1]}
    x2={to[0]}
    y2={to[1]} />
{/if}

<style>
  line {
    stroke: #ddd;
    stroke-opacity: 0.15;
    stroke-dasharray: 3;
    pointer-events: none;
  }
</style>
  