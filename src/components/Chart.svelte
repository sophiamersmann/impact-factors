<script>
  import Svg from './Svg.svelte';
  import Defs from './Defs.svelte';
  import Center from './Center.svelte';
  import AxisX from './AxisX.svelte';
  import AxisY from './AxisY.svelte';
  import Stars from './Stars.svelte';

  import { size } from '../stores/dimensions';
  import { maxCitations, selectedJournal } from '../stores/selections';

  export let data = [];

  let selectedData = [];
  let brightData = [];

  $: selectedData = data
    .filter((d) => d.data.journal === $selectedJournal);

  $: brightData =  selectedData
    .filter((d) => d.data.citedBy < $maxCitations);
</script>

<div
  class="chart-wrapper"
  style="width: {$size}px; height: {$size}px"
>
  <Svg>
    <Defs />
    <g class="axis">
      <AxisY {selectedData} nBrightStars={brightData.length} />
      <AxisX {selectedData} />
    </g>
    <Stars {data} />
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