<script>
  import { quantile, range } from 'd3-array';
  
  import AxisInteraction from './AxisInteraction.svelte';
  import QuantileLine from './QuantileLine.svelte';
  import AxisYLine from './AxisYLine.svelte';
  import Label from './Label.svelte';

  import { skyScale } from '../stores/scales';
  import { maxCitations } from '../stores/selections';
  import { quantiles as rawQuantiles, tickStep } from '../inputs/constants';

  export let selectedData = [];

  let quantiles = [];
  let lines = [];

  $: quantiles = rawQuantiles
    .map((q)=> {
      const value = quantile(
        selectedData.map(d => d.data.citedBy), q);

      return {
        q,
        value,
        radius: $skyScale(value),
        selected: value === $maxCitations,
      };
    });

  $: lines = range(0, $skyScale.domain()[1], tickStep)
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
