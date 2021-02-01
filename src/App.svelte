<script>
  import Catch from './Catch.svelte';
  import Visualisation from './Visualisation.svelte';

  import { universeBackground as color } from './inputs/colors';

  export let width;
  export let height;

  $: minDim = Math.min(width, height) || 0;
</script>

<div
  class="app-wrapper"
  bind:clientWidth={width}
  bind:clientHeight={height}
  style="background: radial-gradient(circle at center, {color.in} 0%, {color.out} 80%)"
>
  {#if width < 600}
    <Catch content={"width < 600"} />
  {:else}
    <Visualisation size={minDim} />
  {/if}
</div>

<style>
  .app-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
