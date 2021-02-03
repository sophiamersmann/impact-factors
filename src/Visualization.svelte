<script>
  import { extent, groups } from 'd3-array';
  import { scaleLinear, scaleSqrt, scalePoint } from 'd3-scale';
  import { pointRadial } from 'd3-shape';

  import Chart from './components/Chart.svelte';

  import { innerRadius, outerRadius, starRadius } from './stores/dimensions';
  import { skyScale, radiusScale } from './stores/scales';

  export let data = [];

  $: skyScale.set(scaleLinear()
    .domain(extent(data, (d) => d.citedBy))
    .range([$innerRadius, $outerRadius]));

  $: radiusScale.set(scaleSqrt()
    .domain(extent(data, d => d.citedBy))
    .range([$starRadius.min, $starRadius.max]));

  $: renderedData = groups(data, (d) => d.journal)
    .map(([, values]) => {
      const dois = values.map((d) => d.doi);
      dois.push('pseudo');
      const angleScale = scalePoint()
        .domain(dois)
        .range([0, 2 * Math.PI]);

      return values.map((d) => {
        const angle = angleScale(d.doi);
        const position = pointRadial(
          angle,
          $skyScale(d.citedBy));

        return {
          angle,
          x: position[0],
          y: position[1],
          r: $radiusScale(d.citedBy),
          data: d,
        };
      });
    }).flat();
</script>

<Chart data={renderedData} />
