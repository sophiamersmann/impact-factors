<script>
  import { selectedStar } from './stores/selections';
  import { duration } from './stores/configurations';

  import { fade } from 'svelte/transition';
  import { quadOut, quadIn } from 'svelte/easing';

  let authors = '';

  const size = 250;

  $: authors = $selectedStar?.authors.split(",").slice(0, 5) + ' et al';
</script>

{#if $selectedStar}
  <div
    class="tooltip"
    style="width: {size}px"
    in:fade={{ duration: $duration, easing: quadOut }}
    out:fade={{ duration: $duration, easing: quadIn }}
  >
    <div class="content">
      <b>{$selectedStar.title}</b>
      <div>
        {authors}.
        <span class="journal">{$selectedStar.journal}</span> {$selectedStar.volume},
        {$selectedStar.page.start}-{$selectedStar.page.end}
        ({$selectedStar.year})
      </div>
      <div class="cited-by">
        Cited <b>{$selectedStar.citedBy}</b> times
      </div>
      </div>
    </div>
{/if}

<style>
  .tooltip {
    position: absolute;
    right: var(--spacing);
    top: var(--spacing);

    padding: calc(var(--spacing) / 2);
    color: white;
    background-color: var(--background-color);
    font-size: 0.9rem;
    border: 2px solid white;
    border-radius: 10px;
    box-shadow: 0 16px 48px rgba(255, 255, 255, 0.08);
  }

  .journal {
    font-style: italic;
    text-transform: capitalize;
  }

  .cited-by {
    display: block;
    border-radius: 5px;
    font-size: 0.8rem;
    background-color: white;
    color: var(--background-color);
    padding: 2px 4px;
    text-align: center;
    margin-top: calc(var(--spacing) / 2);
  }
</style>
