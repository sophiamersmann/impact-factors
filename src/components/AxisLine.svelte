<script>
  export let radius;
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
    stroke-opacity: 0.2;
  }
</style>