<script>
  import { selectedStar } from './stores/selections';
  import { duration } from './stores/configurations';

  import { fly, fade } from 'svelte/transition';
  import { quadOut } from 'svelte/easing';

  let authors = '';

  const width = 250;

  $: authors = $selectedStar?.authors.split(",").slice(0, 5) + ' et al';
</script>

{#if $selectedStar}
  <div
    class="tooltip"
    style="width: {width}px"
    transition:fly={{ x: width, duration: $duration, easing: quadOut }}
  >
    <div class="content">
      <div><b>{$selectedStar.title}</b></div>
      <div>
        {authors}.
        <span class="journal">{$selectedStar.journal}</span> {$selectedStar.volume},
        {$selectedStar.page.start}-{$selectedStar.page.end}
        ({$selectedStar.year})
      </div>
      <div class="doi">DOI: {$selectedStar.doi}</div>
    </div>
    <div class="tag cited-by">Cited <b>{$selectedStar.citedBy}</b> times</div>
  </div>
{/if}

<style>
  .tooltip {
    position: absolute;
    right: var(--spacing);
    top: var(--spacing);
    padding: calc(var(--spacing) / 2);
    background-color: white;
    color: var(--background-color);
    font-size: 0.9rem;
    border-radius: 5px;
  }

  .journal {
    font-style: italic;
    text-transform: capitalize;
  }

  .cited-by {
    display: block;
    text-align: center;
    padding: 4px;
    background-color: gold;
    border-radius: 5px;
    margin-top: 10px;
    font-size: 0.8rem;
    text-transform: uppercase;
  }

  .doi {
    color: gray;
  }
</style>
