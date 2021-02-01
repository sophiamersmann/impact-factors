<script>
  import { mean } from 'd3-array';

  import { tweened } from 'svelte/motion';

  import { duration } from '../stores/configurations';

  export let data = [];

  const impactFactor = tweened(undefined, {
    duration: $duration,
  })

  $: impactFactor.set(mean(data, (d) => d.data.citedBy) || 0);
</script>

<g class="center">
  <text>{Math.round($impactFactor)}</text>
</g>

<style>
  text {
    dominant-baseline: middle;
    text-anchor: middle;
    fill: white;
  }
</style>