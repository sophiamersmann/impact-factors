<script>
  import { arcLine } from '../utils/misc';

  export let value = 0;
  export let radius = 0;

  const labelOffset = 3;

  $: pathId = `path-axis-y-label-${value}`;
</script>

<g class="label label-y">
  <path
    id={pathId}
    d={arcLine(radius + labelOffset, 0, 0.5 * Math.PI)} />
  <text>
    <textPath
      xlink:href={`#${pathId}`}
      startOffset={labelOffset}
    >
      {value}
    </textPath>
  </text>
</g>

<style>
  path {
    fill: none;
    stroke: none;
  }

  text {
    fill: #ddd;
    fill-opacity: 0.8;
    font-size: 10px;
    pointer-events: none;
  }
</style>