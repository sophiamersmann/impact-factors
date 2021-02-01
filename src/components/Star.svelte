<script>
  import { interpolateLab } from 'd3-interpolate';

  import { tweened } from 'svelte/motion';

  import { duration } from '../stores/configurations';

  import {
    star as starColor,
    darkStar as darkStarColor
  } from '../inputs/colors';

  export let x = 0;
  export let y = 0;
  export let r = 0;
  export let bright = true;

  const color = tweened(starColor, {
    duration: $duration,
    interpolate: interpolateLab,
  });

  $: color.set(bright ? starColor : darkStarColor);
</script>

<g class="star">
  <circle
    cx={x}
    cy={y}
    r={r}
    fill={$color}
  />
</g>

<style>
  circle {
    filter: url(#glow);
    pointer-events: none;
  }
</style>