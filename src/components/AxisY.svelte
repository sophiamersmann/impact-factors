<script>
  import { max, quantile, range } from 'd3-array';
  
  import AxisInteraction from './AxisInteraction.svelte';
  import QuantileLine from './QuantileLine.svelte';
  import AxisYLine from './AxisYLine.svelte';
  import Label from './Label.svelte';

  import { skyScale } from '../stores/scales';
  import { quantiles as rawQuantiles, tickStep } from '../inputs/constants';

  export let data = [];
  export let maxValue = Infinity;

  let quantiles = [];
  let lines = [];

  $: quantiles = rawQuantiles
    .map((q)=> {
      const value = quantile(data.map(d => d.data.citedBy), q);

      return {
        q,
        value,
        radius: $skyScale(value),
        selected: value === maxValue,
      };
    });

  $: lines = range(0, max(data, (d) => d.data.citedBy), tickStep)
    .map((value) => ({
      value,
      radius: $skyScale(value),
    }));
</script>

<g class="axis axis-y">
  <AxisInteraction {quantiles} on:darkenSky />
  <g class="quantile-lines">
    {#each quantiles as quantile}
      <QuantileLine
        radius={quantile.radius}
        selected={quantile.selected} />
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
        text={line.value}
      />
    {/each}
  </g>
</g>
