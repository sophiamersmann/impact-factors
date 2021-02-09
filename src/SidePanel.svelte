<script>
  import Legend from './components/Legend.svelte';
  import SelectJournal from './components/SelectJournal.svelte';

  export let data = [];
</script>

<div class="side-panel">
  <class class="top">
    <h1 class="bright">Switching a star article's light off</h1>

    <p>
      The importance of an academic journal is sometimes described
      by the <b>average number of citations</b>
      that
      articles published in previous years received, the so-called
      <i>impact factor</i>.* 
      Often, only few articles receive a lot of attention, while the
      vast majority contribute little.
      This visualisation allows to explore what a journal's impact factor
      <i>could have been</i> if certain articles
      weren't published.
    <p>

    <div class="select">
      <SelectJournal {data} />
    </div>

    <div class="small">
      A star represents an article and encodes the number
      of received citations as:
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
    position: absolute;
    top: var(--spacing);
    left: var(--spacing);
    width: 250px;
    height: calc(100% - var(--spacing));
    font-size: 0.9rem;
    opacity: 0.9;

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
    color: white;
    text-decoration: none;
    border-bottom: 1px solid white;
  }

  .select {
    margin: var(--spacing) 0;
  }

  .small {
    font-size: 0.8rem;
  }
</style>
