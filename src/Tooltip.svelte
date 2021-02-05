<script>
  import { selectedStar } from './stores/selections';
  import { duration } from './stores/configurations';

  import { fly, fade } from 'svelte/transition';
  import { quadOut } from 'svelte/easing';

  let authors = '';

  const width = 250;

  $: authors = $selectedStar?.authors.split(",").slice(0, 5) + ' et al';

  function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
</script>

{#if $selectedStar}
  <div
    class="tooltip"
    style="width: {width}px"
    transition:fly={{ x: width, duration: $duration, easing: quadOut }}
  >
    Cited by: {$selectedStar.citedBy}
    <b>{$selectedStar.title}</b>
    {authors}.
    <i>{capitalize($selectedStar.journal)}</i> {$selectedStar.volume},
    {$selectedStar.page.start}-{$selectedStar.page.end}
    ({$selectedStar.year})
    <span>doi: {$selectedStar.doi}</span>
  </div>
{/if}

<style>
  div {
    position: absolute;
    right: var(--spacing);
    top: var(--spacing);
    padding: calc(var(--spacing) / 2);
    background-color: white;
    color: var(--background-color);
  }
</style>
