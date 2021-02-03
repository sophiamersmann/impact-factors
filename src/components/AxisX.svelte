<script>
  import { rollups } from 'd3-array';

  import AxisXLine from './AxisXLine.svelte';
  import Label from './Label.svelte';
  
  import { innerRadius } from '../stores/dimensions';
  import { angleScale } from '../stores/scales';

  export let data = [];

  $: labels = rollups(
    data,
    (v) => v[0].data.doi,
    (d) => [d.data.year, d.data.volume].join('/')
  ).map(([text, doi]) => ({
    text: text.slice(2),
    doi,
    angle: $angleScale(doi),
  }));
</script>

<g class="axis axis-x">
  <g class="axis-lines">
    {#each labels as label}
      <AxisXLine doi={label.doi} />
    {/each}
  </g>
  <g class="axis-labels">
    {#each labels as label, i}
      <Label
        pathId={`path-axis-x-label-${i}`}
        radius={$innerRadius}
        angle={label.angle}
        text={label.text}
        hanging
      />
    {/each}
  </g>
</g>
