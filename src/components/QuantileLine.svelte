<script>
  import { interpolateLab } from 'd3-interpolate';

  import { tweened } from 'svelte/motion';
  import { quadOut } from 'svelte/easing';

  import {
    axisLine as lineColor,
    selectedAxisLine as selectedLineColor
  } from '../inputs/colors';

  import { activeQuantile } from '../stores/selections';
  import {
    duration,
    shortDuration,
    longDuration
  } from '../stores/configurations';

  export let q = 0;
  export let radius = 0;

  let selected = false;

  const tweenedRadius = tweened(radius, {
    delay: $duration,
    duration: $longDuration,
    easing: quadOut,
  });
  const color = tweened(lineColor, {
    duration: $shortDuration,
    interpolate: interpolateLab,
  });
  const opacity = tweened(0.2, {
    duration: $shortDuration,
  })

  $: selected = q === $activeQuantile;
  $: tweenedRadius.set(radius);
  $: color.set(selected ? selectedLineColor : lineColor);
  $: opacity.set(selected ? 1 : 0.2);
</script>

<circle
  class="axis-line"
  cx="0"
  cy="0"
  r={$tweenedRadius}
  stroke={$color}
  stroke-opacity={$opacity}
/>

<style>
  circle {
    fill: none;
    pointer-events: none;
  }
</style>