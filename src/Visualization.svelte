<script>
  import { ascending } from 'd3-array';

  import Chart from './components/Chart.svelte';

  export let data = [];

  $: data = data.sort(
    (a, b) =>
      ascending(a.year, b.year) ||
      ascending(a.volume, b.volume) ||
      ascending(a.issue, b.issue) ||
      ascending(a.page.start, b.page.start));
</script>

<Chart {data} />
