<script>
  import { rollups } from 'd3-array';
  import { pointRadial } from 'd3-shape';

  import Labels from './Labels.svelte';
  
  import { innerRadius, outerRadius } from '../stores/dimensions';
  import { angleScale } from '../stores/scales';

  export let data = [];

  const lineOffset = 10;

  $: labels = rollups(
    data,
    (v) => v[0].data.location,
    (d) => [d.data.year, d.data.volume].join('/')
  ).map(([text, location], i) => ({
    id: i,
    text: text.slice(2),
    angle: $angleScale(location),
    from: pointRadial($angleScale(location), $innerRadius - lineOffset),
    to: pointRadial($angleScale(location), $outerRadius),
  }));
</script>

<g class="axis axis-x">
  <g class="axis-lines">
    {#each labels as label}
      <line
        class="axis-line"
        x1={label.from[0]}
        y1={label.from[1]}
        x2={label.to[0]}
        y2={label.to[1]} />
    {/each}
  </g>
  <Labels {labels} />
</g>

<style>
  line {
    stroke: #ddd;
    stroke-opacity: 0.2;
    pointer-events: none;
  }
</style>
