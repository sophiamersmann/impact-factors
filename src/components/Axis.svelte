<script>
  import { quantile } from 'd3-array';

  import AxisLine from './AxisLine.svelte';

  import { skyScale } from '../stores/scales';
  import { quantiles as rawQuantiles } from '../inputs/constants';

  export let data = [];

  $: origin = $skyScale(0) || 0;

  $: quantiles = rawQuantiles
    .map((q)=> {
      const value = quantile(data.map(d => d.data.citedBy), q);

      return {
        q,
        value,
        radius: $skyScale(value),
      };
    });
</script>

<g class="axis">
  <AxisLine radius={origin} />
  {#each quantiles as quantile}
    <AxisLine radius={quantile.radius} />
	{/each}
</g>