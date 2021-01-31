<script>
  import Catch from "./Catch.svelte";
  import Visualisation from './components/Visualisation.svelte';

  export let width;
</script>

<div class="app-wrapper" bind:clientWidth={width}>
  {#if width < 600}
    <Catch content={"width < 600"} />
  {:else}
    <Visualisation />
  {/if}
</div>
