<script>
  import {
    csv,
    ascending,
    scalePoint,
    scaleLinear,
    scaleSqrt,
    extent,
    pointRadial,
  } from 'd3';

  import Svg from './components/Svg.svelte';
  import Stars from './components/Stars.svelte';

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
    const page = { start: +d['Page start'], end: +d['Page end'] };

    return {
      authors: d.Authors,
      title: d.Title,
      journal: d['Source title'],
      year,
      volume,
      issue,
      page,
      location: [year, volume, issue, page.start].join('/'),
      citedBy: +d['Cited by'],
      doi: d['DOI'],
    };
  }).then((loaded) => {
    data = loaded.sort(
      (a, b) =>
        ascending(a.year, b.year) ||
        ascending(a.volume, b.volume) ||
        ascending(a.issue, b.issue) ||
        ascending(a.page.start, b.page.start))
  });

  $: angleScale = scalePoint()
    .domain(data.map((d) => d.location))
    .range([(2 * Math.PI) / data.length, 2 * Math.PI]);

  $: skyScale = scaleLinear()
    .domain(extent(data, d => d.citedBy))
    .range([innerRadius, outerRadius]);

  $: radiusScale = scaleSqrt()
    .domain(extent(data, d => d.citedBy))
    .range([starRadius.min, starRadius.max]);

  $: renderedData = data.map((d) => {
    const position = pointRadial(angleScale(d.location), skyScale(d.citedBy));
    return {
      x: position[0],
      y: position[1],
      r: radiusScale(d.citedBy),
      data: d,
    };
  });
</script>

<div
  class="visualisation-wrapper"
  style="width: {size}px; height: {size}px"
>
  <Svg {size}>
    <Stars data={renderedData} />
  </Svg>
</div>

<style>
  .visualisation-wrapper {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
</style>