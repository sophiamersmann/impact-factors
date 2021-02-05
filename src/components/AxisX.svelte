<script>
  import { rollups } from 'd3-array';

  import AxisXLine from './AxisXLine.svelte';
  import Label from './Label.svelte';
  
  import { innerRadius } from '../stores/dimensions';

  export let selectedData = [];
  
  let labels = [];

  $: {
    const grouped = rollups(
      selectedData,
      (v) => v[0].angle,
      (d) => [d.data.year, d.data.volume].join('/')
    );

    let yearsDone = new Set();
    labels = grouped.map(([text, angle]) => {
      const split = text.split('/')
      const year = +split[0];
      if (yearsDone.has(year)) {
        text = split[1];
      } else {
        text = text.slice(2);
      }
      yearsDone.add(year);
      return { text, angle };
    });
  }
</script>

<g class="axis axis-x">
  <g class="axis-lines">
    {#each labels as label}
      <AxisXLine angle={label.angle} />
    {/each}
  </g>
  <g class="axis-labels">
    {#each labels as label, i}
      <Label
        pathId={`path-axis-x-label-${i}`}
        radius={$innerRadius}
        angle={label.angle}
        hanging
      >
        {label.text}
      </Label>
    {/each}
  </g>
</g>
