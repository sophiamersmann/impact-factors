<script>
  import Legend from './components/Legend.svelte';
  import SelectJournal from './components/SelectJournal.svelte';

  export let data = [];
</script>

<div class="side-panel">
  <h1>Title</h1>

  <p>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
    sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
    aliquyam erat, sed diam voluptua. At vero eos et accusam et
    justo duo dolores et ea rebum. Stet clita kasd gubergren,
    no sea takimata sanctus est Lorem ipsum dolor sit amet.
  </p>

  <Legend />
  <SelectJournal {data} />
</div>

<style>
  .side-panel {
    position: absolute;
    top: var(--spacing);
    left: var(--spacing);
    width: 250px;
  }
</style>
