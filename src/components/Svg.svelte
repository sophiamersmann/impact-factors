<script>
  import { universeBackground as bgColor } from '../utils/colors';

  export let size = 0;
</script>

<svg
  width={size}
  height={size}
  viewBox="{-size/2} {-size/2} {size} {size}"
  style="background: radial-gradient({bgColor.in} 0%, {bgColor.out} 100%)"
>
  <slot />
</svg>
