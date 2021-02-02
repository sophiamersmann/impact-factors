<script>
  import { arcLine } from '../utils/misc';

  import { innerRadius } from '../stores/dimensions';

  export let id = 0;
  export let angle = 0;
  export let text = 0;

  const labelOffset = 3;

  $: pathId = `path-axis-x-label-${id}`;
</script>

<g class="label label-x">
  <path
    id={pathId}
    d={arcLine($innerRadius - labelOffset, angle, angle + Math.PI)} />
  <text>
    <textPath
      xlink:href={`#${pathId}`}
      startOffset={labelOffset / 2}
    >
      {text}
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
    dominant-baseline: hanging;
    font-size: 10px;
    pointer-events: none;
  }
</style>
