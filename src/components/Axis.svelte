<script>
  import { quantile } from 'd3-array';

  import AxisX from './AxisX.svelte';
  import AxisY from './AxisY.svelte';
  import AxisInteraction from './AxisInteraction.svelte';

  import { skyScale } from '../stores/scales';
  import { quantiles as rawQuantiles } from '../inputs/constants';

  export let data = [];
  export let maxValue = Infinity;

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
</script>

<g class="axis">
  <AxisInteraction {quantiles} on:darkenSky />
  <AxisX {quantiles} />
  <AxisY {data} />
</g>