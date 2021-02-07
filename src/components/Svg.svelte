<script>
  import { size as storedSize } from '../stores/dimensions';

  export let size = $storedSize;
</script>

<svg
  class="svg"
  width={size}
  height={size}
  viewBox="{-size/2} {-size/2} {size} {size}"
>
  <slot />
</svg>
