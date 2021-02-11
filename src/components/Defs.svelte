<script>
  const glows = [
    { id: 'glow', stdDeviation: 1.5 },
    { id: 'intense-glow', stdDeviation: 3 },
  ];
</script>

<defs>
  {#each glows as { id, stdDeviation }}
    <filter {id} width="300%" x="-100%" height="300%" y="-100%">
      <feGaussianBlur class="blur" {stdDeviation} result="coloredBlur"></feGaussianBlur>
      <feMerge>
        <feMergeNode in="coloredBlur"></feMergeNode>
        <feMergeNode in="SourceGraphic"></feMergeNode>
      </feMerge>
    </filter>
  {/each}
</defs>
