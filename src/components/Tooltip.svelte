<script>
  import { duration } from '../stores/configurations';

  import { fade } from 'svelte/transition';
  import { quadOut } from 'svelte/easing';

  import { denormalize } from '../utils/misc';

  export let article;

  let authors = '';

  const size = 250;

  $: authors = article?.authors.split(",").slice(0, 5) + ' et al';
</script>

{#if article}
  <div
    class="tooltip"
    style="width: {size}px"
    in:fade={{ duration: $duration, easing: quadOut }}
  >
    <div class="content">
      <div class="title bright">
        <b>{article.title}</b>
      </div>
      <div>
        {authors}.
        <span class="journal">{denormalize(article.journal)}</span> {article.volume},
        {article.page.start}-{article.page.end}
        ({article.year})
      </div>
      <div class="cited-by">
        Cited <b>{article.citedBy}</b> times
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
    color: var(--white);
    background-color: var(--background-color);
    font-size: 0.9rem;
    opacity: 0.9;
    line-height: 1.15;
    border: 2px solid var(--white);
    border-radius: 10px;
    box-shadow: 0 16px 48px rgba(255, 255, 255, 0.08);
  }

  .title {
    margin-bottom: calc(var(--spacing) / 4);
  }

  .journal {
    font-style: italic;
    text-transform: capitalize;
  }

  .cited-by {
    display: block;
    border-radius: 5px;
    background-color: #fff;
    color: var(--background-color);
    padding: 2px 4px;
    text-align: center;
    margin-top: calc(var(--spacing) / 2);
  }
</style>
