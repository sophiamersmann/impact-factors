<script>
  import { size } from '../stores/dimensions';
</script>

<svg
  class="svg"
  width={$size}
  height={$size}
  viewBox="{-$size/2} {-$size/2} {$size} {$size}"
>
  <slot />
</svg>
