<script>
  import {
    csv,
    ascending,
    scalePoint,
    scaleLinear,
    extent,
  } from 'd3';

  import Svg from './components/Svg.svelte';

  export let size = 0;

  const dataPath = 'data/nature2019.csv';
  const starRadius = { min: 0.5, max: 6 };
  const margin = starRadius.max;

  $: innerRadius = 0.25 * (size / 2);
  $: outerRadius = (size - 2 * margin) / 2;

  let data = [];

  csv(dataPath, (d) => {
    const year = +d.Year;
    const volume = +d.Volume;
    const issue = +d.Issue;

    return {
      authors: d.Authors,
      title: d.Title,
      journal: d['Source title'],
      year,
      volume,
      issue,
      location: [year, volume, issue].join('/'),
      page: { start: +d['Page start'], end: +d['Page end'] },
      citedBy: +d['Cited by'],
      doi: d['DOI'],
    };
  }).then((loaded) => {
    data = loaded.sort(
      (a, b) =>
        ascending(a.volume, b.volume) ||
        ascending(a.issue, b.issue) ||
        ascending(a.page, b.page))
  });

  const angleScale = scalePoint()
    .domain(data.map((d) => d.location))
    .range([(2 * Math.PI) / data.length, 2 * Math.PI]);

  const skyScale = scaleLinear()
    .domain(extent(data, d => d.citedBy))
    .range([innerRadius, outerRadius]);
</script>

<div
  class="visualisation-wrapper"
  style="width: {size}px; height: {size}px"
>
  <Svg {size}>
    <circle fill="none" stroke="red" r={innerRadius} />
    <circle fill="none" stroke="red" r={outerRadius} />
  </Svg>
</div>

<style>
  .visualisation-wrapper {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
</style>