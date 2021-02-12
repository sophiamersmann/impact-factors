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
    <div class="header bright">
      <h1>Switching the light off</h1>
      <div class="sub-title">
        <i>Academic journals' impact factors without their star articles</i>
      </div>
    </div>

    <p>
      The relevance of an academic journal is sometimes described
      by the <span class="bright"><b>average number of citations</b></span>
      of articles published in previous years. This is referred to as the
      <span class="bright"><i>impact factor</i></span>.<sup>1</sup> 
      Commonly, though, only a small number of articles receive much
      attention, while the vast majority contribute little to
      the impact factor. This visualisation allows exploration of what a
      journal's impact factor <span class="bright"><i>would have been</i></span>
      if certain high-impact articles hadn't been published.
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
      <sup>1</sup> Here, the impact factor reflects the average number
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
    padding: var(--spacing) calc(var(--spacing) / 2) calc(var(--spacing) / 2) var(--spacing);
    height: 100%;
    overflow-y: auto;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .header {
    margin-bottom: var(--spacing);
  }

  .sub-title {
    line-height: 1.15;
  }

  h1 {
    font-family: 'Rubik', Helvetica, Arial, sans-serif;
    font-size: 1.5rem;
    margin: 0;
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
    font-size: 0.9rem;
  }
</style>
