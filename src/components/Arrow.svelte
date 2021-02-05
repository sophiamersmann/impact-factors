<script>
  import { fade, draw } from 'svelte/transition';
  import { quadOut } from 'svelte/easing';

  import { shortDuration } from '../stores/configurations';

  export let x = 0;
  export let y = 0;
  export let orient = 'right';
  export let length = 20;
  export let color = 'currentColor';
  export let animate = false;

  const markerLength = 5;
  const markerWidth = 3;

  const rotate = {
    down: 0,
    left: 90,
    up: 180,
    right: 270,
  }[orient];

  const arrowAnimation = {
    duration: animate ? 10 : 0,
    delay: $shortDuration,
  };
</script>

<g
  class="arrow"
  transform="translate({x}, {y}) rotate({rotate})"
  stroke={color}
>
  <line
    x1="0"
    y1="0"
    x2="0"
    y2={length}
    in:draw={{ duration: animate ? $shortDuration : 0, easing: quadOut }}
  />
  <line
    class="arrow-marker"
    x1={-markerWidth}
    y1={length - markerLength}
    x2="0"
    y2={length}
    in:fade={arrowAnimation}
  />
  <line
    class="arrow-marker"
    x1={markerWidth}
    y1={length - markerLength}
    x2="0"
    y2={length}
    in:fade={arrowAnimation}
  />
</g>

<style>
  line {
    stroke-width: 1.2;
  }
</style>
