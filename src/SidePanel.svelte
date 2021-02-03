<script>
  import { selectedJournal } from './stores/selections';
</script>

<div class="side-panel">
  Side Panel

  <select bind:value={$selectedJournal}>
    <option value="nature">Nature</option>
    <option value="science">Science</option>
  </select>
</div>

<style>
  .side-panel {
    position: absolute;
  }
</style>
