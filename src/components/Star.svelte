<script>
  import { interpolateLab } from 'd3-interpolate';

  import { tweened } from 'svelte/motion';
  import { quadIn, quadInOut } from 'svelte/easing';

  import { maxCitations, selectedJournal } from '../stores/selections';
  import { duration } from '../stores/configurations';

  import {
    star as starColor,
    darkStar as darkStarColor
  } from '../inputs/colors';

  export let x = 0;
  export let y = 0;
  export let r = 0;
  export let data;

  let show = true;
  let bright = true;

  $: show = data.journal === $selectedJournal;
  $: bright = data.citedBy < $maxCitations;

  const tweenedR = tweened(0, {
    duration: 4 * $duration,
    easing: quadInOut,
  });

  const color = tweened(starColor, {
    duration: $duration,
    interpolate: interpolateLab,
    easing: quadIn,
  });

  $: tweenedR.set(show ? r : 0);
  $: color.set(bright ? starColor : darkStarColor);
</script>

<circle
  class="star {bright ? 'bright' : ''}"
  cx={x}
  cy={y}
  r={$tweenedR}
  fill={$color}
/>

<style>
  .star.bright {
    filter: url(#glow);
  }
</style>
