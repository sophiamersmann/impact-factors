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
      The importance of an academic journal is sometimes described
      by the <b>average number of citations</b> that
      articles published in previous years received, referred to as
      the <i>impact factor</i>.* 
      Often, only few articles receive a lot of attention, while the
      vast majority of articles contribute little.
      This visualisation allows to explore what a journal's impact factor
      <i>would have been</i> if certain high-impact articles
      weren't published.
    <p>

    <div class="select">
      <SelectJournal {data} />
    </div>

    <div class="small">
      <p>
        A star represents an article and encodes the number
        of received citations as:
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

  h1 {
    font-size: 1.3rem;
    margin-bottom: calc(var(--spacing) / 2);
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
