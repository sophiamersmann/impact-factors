<script>
  import { mean } from 'd3-array';

  import NumberPair from './NumberPair.svelte';

  import translate from '../actions/translate';

  import { innerRadius } from '../stores/dimensions';

  export let selectedData = [];
  export let brightData = [];

  const gOffset = $innerRadius / 4;
  const textOffset = 18;

  const starCount = (data) => data.length;
  const computeImpactFactor = (data) => mean(data, (d) => d.data.citedBy);

  let nStars = 0;
  let impactFactor = 0;

  $: nStars = starCount(selectedData);
  $: impactFactor = computeImpactFactor(selectedData);
</script>

<g class="center">
  <g
    class="g-impact"
    use:translate={{ dy: -gOffset }}
  >
    <text dy={-textOffset}>Impact Factor</text>
    <NumberPair
      staticNumber={Math.round(impactFactor)}
      data={brightData}
      func={computeImpactFactor}
    />
  </g>

  <g
    class="g-count"
    use:translate={{ dy: gOffset }}
  >
    <text dy={-textOffset}>based on </text>
    <NumberPair
      staticNumber={Math.round(nStars)}
      data={brightData}
      func={starCount}
    />
    <text dy={textOffset}>articles</text>
  </g>
</g>

<style>
  text {
    font-size: 0.85rem;
    dominant-baseline: middle;
    text-anchor: middle;
    pointer-events: none;
    fill: currentColor;
  }
</style>
