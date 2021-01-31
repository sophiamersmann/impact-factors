<defs>
  <filter id="glow">
    <feGaussianBlur
      stdDeviation="1.4"
      result="coloredBlur"
    />
    <feMerge>
      <feMergeNode in="coloredBlur" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
</defs>
