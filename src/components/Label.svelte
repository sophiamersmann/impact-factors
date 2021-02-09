<script>
  import { pointRadial } from 'd3-shape';

  export let pathId = '';
  export let radius = 0;
  export let angle = 0;
  export let hanging = false;
  export let color = 'var(--gray)';
  export let opacity = 0.8;

  const offset = 3;

  $: radius += hanging ? -offset : +offset;

  function arcLine(radius, startAngle, endAngle) {
    return [
        `M${pointRadial(startAngle, radius)}`,
        `A${radius},${radius} 0,0,1 ${pointRadial(endAngle, radius)}`,
    ].join(' ');
  }
</script>

<g class="label">
  <path
    id={pathId}
    d={arcLine(radius, angle, angle + Math.PI)} />
  <text
    fill-opacity={opacity}
    style="dominant-baseline: {hanging ? 'hanging' : 'auto'}; fill: {color}"
  >
    <textPath
      xlink:href={`#${pathId}`}
      startOffset={offset}
    >
      <slot />
    </textPath>
  </text>
</g>

<style>
  path {
    fill: none;
    stroke: none;
  }

  text {
    font-size: 10px;
    pointer-events: none;
  }
</style>
