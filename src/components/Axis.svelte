<script>
  import { range, quantile } from 'd3';

  import AxisLine from './AxisLine.svelte';

  import { roundToOneDecimalPoint as round } from '../utils/round';

  export let data = [];
  export let skyScale;

  $: quantiles = range(0.1, 1.1, 0.1)
    .map((q)=> {
      const value = quantile(data.map(d => d.data.citedBy), round(q));
      return {
        q: round(q),
        value,
        radius: skyScale(value),
      };
    });
</script>

<g class="axis">
  {#each quantiles as quantile}
    <AxisLine radius={quantile.radius} />
	{/each}
</g>