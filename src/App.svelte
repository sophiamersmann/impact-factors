<script>
  import Catch from './Catch.svelte';
  import SidePanel from './SidePanel.svelte';
  import Visualization from './Visualization.svelte';
  import Tooltip from './Tooltip.svelte';

  import { panelWidth, size } from './stores/dimensions';

  import loadData from './utils/loadData';

  export let width;
  export let height;

  $: size.set(Math.min(width, height) || 0);
</script>

<div
  class="app-wrapper"
  bind:clientWidth={width}
  bind:clientHeight={height}
  style="background: radial-gradient(
    circle at {50 + $panelWidth / width * 100 / 2}%,
    var(--background-color-center) 0%,
    var(--background-color) 80%)"
>
  {#if width < 600}
    <Catch content={"width < 600"} />
  {:else}
    {#await loadData() then data}
      <main>
        <SidePanel {data} />
        <Visualization {data} />
      </main>
    {/await}
    <Tooltip />
  {/if}
</div>

<style>
  .app-wrapper {
    width: 100%;
    height: 100%;
  }

  main {
    display: grid;
    grid-template-columns: minmax(250px, 20%) 1fr;
    height: 100%;
  }
</style>
