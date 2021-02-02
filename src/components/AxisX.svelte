<script>
  import { rollups } from 'd3-array';
  import { pointRadial } from 'd3-shape';
  
  import { innerRadius, outerRadius } from '../stores/dimensions';
  import { angleScale } from '../stores/scales';

  export let data = [];

  $: labels = rollups(
    data,
    (v) => v[0].data.location,
    (d) => [d.data.year, d.data.volume].join('/')
  ).map(([text, location]) => ({
    text,
    from: pointRadial($angleScale(location), $innerRadius - 20),
    to: pointRadial($angleScale(location), $outerRadius),
  }));

  $: console.log(labels);
</script>

<g class="axis axis-x">
  {#each labels as label}
    <line
      class="axis-line"
      x1={label.from[0]}
      y1={label.from[1]}
      x2={label.to[0]}
      y2={label.to[1]} />
  {/each}
</g>

<style>
  line {
    stroke: #ddd;
    stroke-opacity: 0.2;
    pointer-events: none;
  }
</style>