<script>
  import { format as d3Format } from 'd3-format';

  import { tweened } from "svelte/motion";
  import { fly } from "svelte/transition";

  import { activeQuantile, maxCitations } from '../stores/selections';
  import { duration, longDuration } from '../stores/configurations';
  import { quadOut } from "svelte/easing";

  export let staticNumber = 0;
  export let data = [];
  export let func;

  let percentageChange = 0;
  let difference = 0;
  let format;

  const xOffset = 27;
  const arrowOffset = 15;
  const xFly = 10;

  const x = tweened(0, {
    duration: $longDuration,
    easing: quadOut,
  });
  const reactiveNumber = tweened(undefined, {
    duration: $duration,
    easing: quadOut,
  });

  $: updated = $maxCitations < Infinity;
  $: x.set(updated ? xOffset : 0);
  $: reactiveNumber.set(Math.round(func(data)));

  $: difference = $reactiveNumber - staticNumber;
  $: percentageChange = 1 - ($reactiveNumber / staticNumber);

  $: format = d3Format($activeQuantile === 0.999 ?'.1%' : '.0%');
</script>

<g class="number-pair">
  <text
    class="static-number"
    x={-$x}
    style="text-anchor: {updated ? 'end' : 'middle'}"
  >
    {staticNumber}
  </text>
  {#if updated}
    <g
      in:fly={{ duration: $longDuration, delay: $longDuration - 100, x: xFly }}
      out:fly={{ duration: $longDuration, x: xFly }}
    >  
      <text class="difference" dy="-5">
        {Math.round(difference)}
      </text>
      <line
        x1={-xOffset + arrowOffset}
        y1="0"
        x2={xOffset - arrowOffset}
        y2="0"
      />
      <text
        class="reactive-number"
        x={xOffset}
      >
        {Math.round($reactiveNumber)}
        <tspan
          class="change {percentageChange ? '' : 'zero'}"
          dx="3"
        >
          (-{format(percentageChange)})
        </tspan>
      </text>
    </g>
  {/if}
</g>

<style>
  * {
    pointer-events: none;
  }

  line {
    stroke: currentColor;
  }

  text {
    fill: currentColor;
    dominant-baseline: middle;
    font-size: 0.8rem;
  }

  .static-number,
  .reactive-number {
    font-weight: bold;
  }

  .reactive-number {
    text-anchor: start;
    fill: gold;
  }

  .difference {
    text-anchor: middle;
    font-size: 0.6rem;
  }

  .change {
    fill: currentColor;
    font-weight: normal;
  }

  .change:not(.zero) {
    fill: orangered;
  }
</style>