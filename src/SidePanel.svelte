<script>
  import Legend from './components/Legend.svelte';
  import SelectJournal from './components/SelectJournal.svelte';

  import { panelWidth } from './stores/dimensions';

  export let data = [];
</script>

<div
  class="side-panel"
  bind:clientWidth={$panelWidth}
>
  <class class="top">
    <h1 class="bright">Switching a star article's light off</h1>

    <p>
      The relevance of an academic journal is sometimes described
      by the <b>average number of citations</b> of articles published
      in previous years. This is referred to as the <i>impact factor</i>.* 
      Commonly, though, only a small number of articles receive much
      attention, while the vast majority of articles contribute little to
      the impact factor. This visualisation allows exploration of what a
      journal's impact factor <i>would have been</i> if certain high-impact
      articles hadn't been published.
    <p>

    <div class="select">
      <SelectJournal {data} />
    </div>

    <div class="small">
      <p>
        Each star represents an article and encodes the number
        of received citations:
      </p>
      <Legend />
    </div>

  </class>

  <div class="bottom small">
    <p>
      *Here, the impact factor reflects the average number
      of citations that articles published in 2018/19
      received up until now (Feb 2021).
    </p>

    <p>
      Code availbale on
      <a href="https://github.com/sophiamersmann/impact-factors" target="_blank">
        GitHub
      </a>
    </p>
  </div>
</div>

<style>
  .side-panel {
    padding: var(--spacing) 0 calc(var(--spacing) / 2) var(--spacing);
    font-size: 0.9rem;
    opacity: 0.9;
    height: 100%;
    overflow-y: auto;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  p {
    margin: calc(var(--spacing) / 2) 0;
  }

  a {
    color: var(--white);
    text-decoration: none;
    border-bottom: 1px solid var(--white);
  }

  .select {
    margin: var(--spacing) 0;
  }

  .small {
    font-size: 0.8rem;
  }
</style>
