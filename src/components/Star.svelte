<script>
  import { interpolateLab } from 'd3-interpolate';

  import { tweened } from 'svelte/motion';
  import { quadIn, quadOut } from 'svelte/easing';

  import tooltipable from '../actions/tooltipable';
  import { maxCitations } from '../stores/selections';
  import { duration, longDuration } from '../stores/configurations';

  import { intenseBrightnessThreshold } from '../inputs/constants';
  import {
    star as starColor,
    darkStar as darkStarColor
  } from '../inputs/colors';

  export let x = 0;
  export let y = 0;
  export let r = 0;
  export let data = null;
  export let intense = false;

  let bright = true;

  $: if (data) {
    bright = data.citedBy < $maxCitations;
    intense = data.citedBy >= intenseBrightnessThreshold;
  }

  const tweenedR = tweened(0, {
    delay: 2 * Math.random() * $longDuration,
    duration: $longDuration,
    easing: quadOut,
  });

  const color = tweened(starColor, {
    duration: $duration,
    interpolate: interpolateLab,
    easing: quadIn,
  });

  $: tweenedR.set(r);
  $: color.set(bright ? starColor : darkStarColor);
</script>

<circle
  class="star"
  class:bright
  class:intense
  cx={x}
  cy={y}
  r={$tweenedR}
  fill={$color}
  use:tooltipable={data}
/>

<style>
  .star.bright {
    filter: url(#glow);
  }

  .star.bright.intense {
    filter: url(#intense-glow);
  }
</style>
