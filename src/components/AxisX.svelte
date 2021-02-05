<script>
  import { rollups } from 'd3-array';

  import AxisXLine from './AxisXLine.svelte';
  import Label from './Label.svelte';
  
  import { innerRadius } from '../stores/dimensions';

  export let selectedData = [];

  $: labels = rollups(
    selectedData,
    (v) => v[0].angle,
    (d) => [d.data.year, d.data.volume].join('/')
  );
</script>

<g class="axis axis-x">
  <g class="axis-lines">
    {#each labels as [, angle]}
      <AxisXLine {angle} />
    {/each}
  </g>
  <g class="axis-labels">
    {#each labels as [text, angle], i}
      <Label
        pathId={`path-axis-x-label-${i}`}
        radius={$innerRadius}
        {angle}
        hanging
      >
        {text.slice(2)}
      </Label>
    {/each}
  </g>
</g>
