<script>
  import Catch from './Catch.svelte';
  import SidePanel from './SidePanel.svelte';
  import Visualization from './Visualization.svelte';

  import { panelWidth, size } from './stores/dimensions';
  import { minWidth } from './inputs/constants';

  import loadData from './utils/loadData';

  export let width;
  export let height;

  let backgroundCenter = 'center';
  let background = 'var(--background-color-static)';

  $: size.set(Math.min(width, height) || 0);

  $: backgroundCenter = $panelWidth ? `${50 + $panelWidth / width * 100 / 2}%` : 'center';
  $: background = width < minWidth
    ? 'var(--background-color-static)'
    : `radial-gradient(circle at ${backgroundCenter}, var(--background-color-center) 0%, var(--background-color) 80%)`;
</script>

<div
  class="app-wrapper"
  bind:clientWidth={width}
  bind:clientHeight={height}
  style="background: {background}"
>
  {#if width < minWidth}
    <Catch />
  {:else}
    {#await loadData() then data}
      <main>
        <SidePanel {data} />
        <Visualization {data} />
      </main>
    {/await}
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
