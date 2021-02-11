<script>
  import { range } from 'd3-array';
  
  import AxisInteraction from './AxisInteraction.svelte';
  import QuantileLine from './QuantileLine.svelte';
  import AxisYLine from './AxisYLine.svelte';
  import Label from './Label.svelte';

  import { skyScale } from '../stores/scales';
  import { tickStep } from '../inputs/constants';

  export let quantiles = [];

  let lines = [];

  $: lines = range(tickStep, $skyScale.domain()[1], tickStep)
    .map((value) => ({
      value,
      radius: $skyScale(value),
    }));
</script>

<g class="axis axis-y">
  <AxisInteraction {quantiles} />
  <g class="quantile-lines">
    {#each quantiles as quantile}
      <QuantileLine
        q={quantile.q}
        radius={quantile.radius} />
    {/each}
  </g>
  <g class="axis-lines">
    {#each lines as line}
      <AxisYLine radius={line.radius} />
    {/each}
  </g>
  <g class="axis-labels">
    {#each lines as line}
      <Label
        pathId={`path-axis-y-label-${line.value}`}
        radius={line.radius}
        angle="0"
      >
        {line.value}
      </Label>
    {/each}
  </g>
</g>
