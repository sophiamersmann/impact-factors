<script>
  import { mean } from 'd3-array';

  import { tweened } from 'svelte/motion';

  import { maxCitations } from '../stores/selections';
  import { duration } from '../stores/configurations';

  export let data = [];

  const impactFactor = tweened(undefined, {
    duration: $duration,
  })

  $: impactFactor.set(
    mean(data.filter((d) => d.citedBy < $maxCitations),
    (d) => d.data.citedBy) || 0);
</script>

<g class="center">
  <text>{Math.round($impactFactor)}</text>
</g>

<style>
  text {
    dominant-baseline: middle;
    text-anchor: middle;
    fill: white;
    pointer-events: none;
  }
</style>