<script>
  import { quantile } from 'd3-array';

  import Svg from './Svg.svelte';
  import Defs from './Defs.svelte';
  import Center from './Center.svelte';
  import AxisX from './AxisX.svelte';
  import AxisY from './AxisY.svelte';
  import QuantileLabels from './QuantileLabels.svelte';
  import Stars from './Stars.svelte';

  import { size } from '../stores/dimensions';
  import { skyScale } from '../stores/scales';
  import { maxCitations, selectedJournal } from '../stores/selections';

  import { quantiles as rawQuantiles } from '../inputs/constants';

  export let data = [];

  let selectedData = [];
  let brightData = [];
  let quantiles = [];

  $: selectedData = data
    .filter((d) => d.data.journal === $selectedJournal);

  $: brightData =  selectedData
    .filter((d) => d.data.citedBy < $maxCitations);

  $: quantiles = rawQuantiles
    .map((q)=> {
      const value = quantile(
        selectedData.map(d => d.data.citedBy), q);

      return {
        q,
        value,
        radius: $skyScale(value),
      };
    });
</script>

<div
  class="chart-wrapper"
  style="width: {$size}px; height: {$size}px"
>
  <Svg>
    <Defs />
    <g class="axis">
      <AxisY {quantiles} />
      <AxisX {selectedData} />
    </g>
    <Stars {data} />
    <QuantileLabels
      {quantiles}
      nStars={selectedData.length}
      nBrightStars={brightData.length} />
    <Center {selectedData} {brightData} />
  </Svg>
</div>

<style>
  .chart-wrapper {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
</style>