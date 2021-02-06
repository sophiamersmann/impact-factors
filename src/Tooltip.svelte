<script>
  import { selectedStar } from './stores/selections';
  import { duration } from './stores/configurations';

  import { fly } from 'svelte/transition';
  import { quadOut, quadIn } from 'svelte/easing';

  let authors = '';

  const size = 250;

  $: authors = $selectedStar?.authors.split(",").slice(0, 5) + ' et al';
</script>

{#if $selectedStar}
  <div
    class="tooltip"
    style="width: {size}px; height: {size}px"
    in:fly={{ x: size, duration: $duration, easing: quadOut }}
    out:fly={{ x: size, duration: $duration, easing: quadIn }}
  >
    <div class="content">
      <span aria-hidden='true'></span>
      <b>{$selectedStar.title}</b> {authors}.
      <span class="journal">{$selectedStar.journal}</span> {$selectedStar.volume},
      {$selectedStar.page.start}-{$selectedStar.page.end}
      ({$selectedStar.year})
      <div class="cited-by">Cited <b>{$selectedStar.citedBy}</b> times</div>
      </div>
    </div>
{/if}

<style>
  .tooltip {
    position: absolute;
    right: var(--spacing);
    top: var(--spacing);

    display: grid;
    place-items: center;
    
    padding: 20px;
    color: white;
    background-color: var(--background-color);
    font-size: 0.9rem;
    border-radius: 50%;
    text-align: center;
    border: 2px solid white;
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
    width: max-content;
    color: var(--background-color);
    padding: 2px 4px;
    margin: 6px auto;
  }

  [aria-hidden='true']:after,
  [aria-hidden='true']:before {
    float: left;
    width: 50%; height: 100%;
    --bite: radial-gradient(farthest-side
                            at var(--pos-x, 100%), 
                            transparent 100%, red);
    -webkit-shape-outside: var(--bite);
            shape-outside: var(--bite);
    content: ''
  }

  [aria-hidden='true']:after {
		float: right;
		--pos-x: 0
	}
</style>
