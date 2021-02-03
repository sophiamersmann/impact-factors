<script>
  import { pairs } from 'd3-array';
  import { arc as d3Arc } from 'd3-shape';

  import { maxCitations } from '../stores/selections';

  export let quantiles = [];

  let data = [];

  const arc = d3Arc()
    .startAngle(0)
    .endAngle(2 * Math.PI);

  $: {
    data = pairs(quantiles);
    data[0][0] = { q: undefined, value: undefined, radius: 0 };
  }

  function darkenSky(maxValue) {
    maxCitations.set(maxValue);
  }

  function lightUpSky(event) {
    const relatedTarget = event.relatedTarget;
    if (relatedTarget && !relatedTarget.classList.contains('svg')) return;
    maxCitations.set(Infinity);
  }
</script>

<g class="axis-interaction">
  {#each data as d}
    <path
      on:mouseenter={() => darkenSky(d[1].value)}
      on:mouseleave={lightUpSky}
      d={arc({ innerRadius: d[0].radius, outerRadius: d[1].radius })}
    />
  {/each}
</g>

<style>
  .axis-interaction {
    fill: transparent;
  }
</style>
