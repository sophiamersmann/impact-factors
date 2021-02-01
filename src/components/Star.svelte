<script>
  import {
    star as starColor,
    darkStar as darkStarColor
  } from '../inputs/colors';

  export let x = 0;
  export let y = 0;
  export let r = 0;
  export let bright = true;
</script>

<g class="star">
  <circle
    cx={x}
    cy={y}
    r={r}
    fill={bright ? starColor : darkStarColor}
  />
</g>

<style>
  circle {
    filter: url(#glow);
    pointer-events: none;
  }
</style>