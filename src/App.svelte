<script>
  import Catch from './Catch.svelte';
  import SidePanel from './SidePanel.svelte';
  import Visualization from './Visualization.svelte';

  import { size } from './stores/dimensions';

  export let width;
  export let height;

  $: size.set(Math.min(width, height) || 0);
</script>

<div
  class="app-wrapper"
  bind:clientWidth={width}
  bind:clientHeight={height}
>
  {#if width < 600}
    <Catch content={"width < 600"} />
  {:else}
    <div class="side-panel">
      <SidePanel />
    </div>
    <Visualization />
    <div class="side-panel" />
  {/if}
</div>

<style>
  .app-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at center,
      var(--background-color-center) 0%,
      var(--background-color) 80%);
  }

  .side-panel {
    flex-grow: 1;
  }
</style>
