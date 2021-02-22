<script>
  import Arrow from './Arrow.svelte';

  import { tweened } from "svelte/motion";
  import { fly } from "svelte/transition";

  import translate from '../actions/translate';
  import { maxCitations } from '../stores/selections';
  import { duration, longDuration } from '../stores/configurations';
  import { quadOut } from "svelte/easing";

  export let staticNumber = 0;
  export let data = [];
  export let func;

  let percentageChange = 0;
  let difference = 0;
  let format;

  let reactiveNumberElem;
  let reactiveNumberElemWidth = 0;

  const xOffset = 27;
  const innerOffset = 15;
  const xFly = 10;
  const arrowLength = 14;

  const x = tweened(0, {
    duration: $longDuration,
    easing: quadOut,
  });
  const reactiveNumber = tweened(undefined, {
    duration: $duration,
    easing: quadOut,
  });

  const round = (x) => Math.round(x);
  const roundToOneDecimal = (x) => Math.round(x * 10) / 10;

  $: updated = $maxCitations < Infinity;
  $: x.set(updated ? xOffset : 0);
  $: reactiveNumber.set(Math.round(func(data)));

  $: difference = $reactiveNumber - staticNumber;
  $: percentageChange = 1 - ($reactiveNumber / staticNumber);

  $: format = 100 * percentageChange < 10 ? roundToOneDecimal : round;

  $: reactiveNumberElemWidth = reactiveNumberElem ? reactiveNumberElem.getBBox().width : 0;
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
      <line
        x1={-xOffset + innerOffset}
        y1="0"
        x2={xOffset - innerOffset}
        y2="0"
      />
      <text class="difference" dy="-5">
        {Math.round(difference)}
      </text>
      <text
        class="reactive-number"
        x={xOffset}
        bind:this={reactiveNumberElem}
      >
        {Math.round($reactiveNumber)}
      </text> 
      <g use:translate={{ dx: xOffset + reactiveNumberElemWidth + 10 }}>
        {#if percentageChange > 0}
          <Arrow
            orient="down"
            length={arrowLength}
            y={-arrowLength/2} />
        {/if}
        <text
          class="change"
          class:zero={!percentageChange}
          dx="5"
        >
          {format(100 * percentageChange)}%
        </text>
      </g>     
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
    font-size: 0.9rem;
  }

  .static-number,
  .reactive-number,
  .change {
    font-weight: bold;
  }

  .reactive-number {
    text-anchor: start;
    fill: var(--primary);
  }

  .difference {
    text-anchor: middle;
    font-size: 0.8rem;
  }

  .change {
    fill: var(--danger);
  }

  .change.zero {
    fill: currentColor;
  }

  .number-pair :global(.arrow) {
    stroke: var(--danger);
  }

  .number-pair :global(.arrow line) {
    stroke-width: 1.6;
  }
</style>