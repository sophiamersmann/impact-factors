<script>
  import { star as starColor } from '../utils/colors';

  export let x;
  export let y;
  export let r;
</script>

<g class="star">
  <circle
    cx={x}
    cy={y}
    r={r}
    fill={starColor}
  />
</g>