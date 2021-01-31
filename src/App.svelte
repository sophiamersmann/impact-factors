<script>
  import Catch from './Catch.svelte';
  import Visualisation from './Visualisation.svelte';

  export let width;
  export let height;

  $: minDim = Math.min(width, height) || 0;
</script>

<div class="app-wrapper" bind:clientWidth={width} bind:clientHeight={height}>
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
