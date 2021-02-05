<script>
  import { interpolateLab } from 'd3-interpolate';

  import { tweened } from 'svelte/motion';
  import { quadIn, quadOut } from 'svelte/easing';

  import { maxCitations, selectedStar } from '../stores/selections';
  import { duration, longDuration } from '../stores/configurations';

  import {
    star as starColor,
    darkStar as darkStarColor
  } from '../inputs/colors';

  export let x = 0;
  export let y = 0;
  export let r = 0;
  export let data;

  let bright = true;

  $: bright = data.citedBy < $maxCitations;

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

  function selectStar() {
    if (bright) selectedStar.set(data);
  }
</script>

<circle
  class="star"
  class:bright
  cx={x}
  cy={y}
  r={$tweenedR}
  fill={$color}
  on:mouseenter={selectStar}
  on:mouseleave={() => selectedStar.set(undefined)}
/>

<style>
  .star.bright {
    filter: url(#glow);
  }
</style>
