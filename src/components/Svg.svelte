<script>
  export let size = 0;
</script>

<svg
  width={size}
  height={size}
  viewBox="{-size/2} {-size/2} {size} {size}"
>
  <slot />
</svg>
