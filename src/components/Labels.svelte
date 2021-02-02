<script>
  import { pointRadial } from 'd3-shape';

  import { innerRadius } from '../stores/dimensions';

  export let labels = [];

  const labelOffset = 3;

  function arcLine(radius, startAngle, endAngle) {
    return [
      `M${pointRadial(startAngle, radius)}`,
      `A${radius},${radius} 0,0,1 ${pointRadial(endAngle, radius)}`,
    ].join(' ');
  }
</script>

<g class="labels">
  {#each labels as label}
    <g class="label">
      <path
        id={`path-axis-label-${label.id}`}
        d={arcLine($innerRadius - labelOffset, label.angle, label.angle + Math.PI)} />
      <text>
        <textPath
          xlink:href={`#path-axis-label-${label.id}`}
          startOffset={labelOffset / 2}
        >
          {label.text}
        </textPath>
      </text>
    </g>
  {/each}
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
