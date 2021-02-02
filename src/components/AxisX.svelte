<script>
  import { rollups } from 'd3-array';

  import AxisXLine from './AxisXLine.svelte';
  import AxisXLabel from './AxisXLabel.svelte';
  
  import { angleScale } from '../stores/scales';

  export let data = [];

  $: labels = rollups(
    data,
    (v) => v[0].data.location,
    (d) => [d.data.year, d.data.volume].join('/')
  ).map(([text, location]) => ({
    text: text.slice(2),
    location,
    angle: $angleScale(location),
  }));
</script>

<g class="axis axis-x">
  <g class="axis-lines">
    {#each labels as label}
      <AxisXLine location={label.location} />
    {/each}
  </g>
  <g class="axis-labels">
    {#each labels as label, i}
      <AxisXLabel id={i} angle={label.angle} text={label.text} />
    {/each}
  </g>
</g>

