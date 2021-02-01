<script>
  import { star as starColor } from '../inputs/colors';

  export let x = 0;
  export let y = 0;
  export let r = 0;
</script>

<g class="star">
  <circle
    cx={x}
    cy={y}
    r={r}
    fill={starColor}
  />
</g>

<style>
  circle {
    filter: url(#glow);
  }
</style>