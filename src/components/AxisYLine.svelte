<script>
  export let radius = 0;
</script>

<circle
  class="axis-line"
  cx="0"
  cy="0"
  r={radius}
/>

<style>
  circle {
    fill: none;
    stroke: #ddd;
    stroke-opacity: 0.15;
    stroke-dasharray: 3;
    pointer-events: none;
  }
</style>