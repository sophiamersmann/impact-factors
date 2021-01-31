<script>
  import Svg from './components/Svg.svelte';

  export let size = 0;
</script>

<div
  class="visualisation-wrapper"
  style="width: {size}px; height: {size}px"
>
  <Svg {size} />
</div>

<style>
  .visualisation-wrapper {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
</style>