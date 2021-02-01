<script>
  import { quantile } from 'd3';

  import AxisLine from './AxisLine.svelte';

  import { quantiles as rawQuantiles } from '../inputs/constants';

  export let data = [];
  export let skyScale;

  $: quantiles = rawQuantiles
    .map((q)=> {
      const value = quantile(data.map(d => d.data.citedBy), q);

      return {
        q,
        value,
        radius: skyScale(value),
      };
    });
</script>

<g class="axis">
  <AxisLine radius={skyScale(0)} />
  {#each quantiles as quantile}
    <AxisLine radius={quantile.radius} />
	{/each}
</g>