<script>
  import { interpolateLab } from 'd3-interpolate';

  import { fade } from 'svelte/transition';
  import { tweened } from 'svelte/motion';
  import { quadIn } from 'svelte/easing';

  import { duration } from '../stores/configurations';

  import {
    star as starColor,
    darkStar as darkStarColor
  } from '../inputs/colors';

  export let x = 0;
  export let y = 0;
  export let r = 0;
  export let bright = true;
  export let data;

  const color = tweened(starColor, {
    duration: $duration,
    interpolate: interpolateLab,
    easing: quadIn,
  });

  $: color.set(bright ? starColor : darkStarColor);
</script>

<circle
  class="star"
  cx={x}
  cy={y}
  r={r}
  fill={$color}
  transition:fade
>
  <title>{data.citedBy}</title>
</circle>

<style>
  .star {
    filter: url(#glow);
  }
</style>