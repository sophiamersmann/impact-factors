<script>
  import { groups } from 'd3-array';

  import { fade } from 'svelte/transition';
  import { quadIn } from 'svelte/easing';

  import Star from './Star.svelte';

  import { selectedJournal } from '../stores/selections';
  import { duration } from '../stores/configurations';

  export let data = [];

  $: groupedPapers = groups(data, (d) => d.data.journal);
</script>

<g class="stars">
  {#each groupedPapers as [journal, papers] (journal)}
    {#if journal === $selectedJournal}
      <g
        class="star-group"
        out:fade={{ duration: $duration, easing: quadIn }}
      >
        {#each papers as { x, y, r, data } (data.doi)}   
          <Star {x} {y} {r} {data} />
        {/each}
      </g>
    {/if}
  {/each}
</g>
