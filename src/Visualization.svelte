<script>
  import { extent } from 'd3-array';
  import { scaleLinear, scaleSqrt } from 'd3-scale';

  import Chart from './components/Chart.svelte';

  import { innerRadius, outerRadius, starRadius } from './stores/dimensions';
  import { skyScale, radiusScale } from './stores/scales';
  import { selectedJournal } from './stores/selections';

  export let data = [];

  $: skyScale.set(scaleLinear()
    .domain(extent(data, (d) => d.citedBy))
    .range([$innerRadius, $outerRadius]));

  $: radiusScale.set(scaleSqrt()
    .domain(extent(data, d => d.citedBy))
    .range([$starRadius.min, $starRadius.max]));

  $: data = data
    .map((d) => {
      d.show = d.journal.toLowerCase() === $selectedJournal;
      return d;
    });
</script>

<Chart {data} />
