<script>
  // Adapted from https://github.com/rob-balfre/svelte-select/blob/master/src/Selection.svelte

  export let getSelectionLabel = undefined;
  export let item = undefined;
</script>

<style>
  .selection {
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
    font-weight: bold;
  }
</style>

<div class="selection">
  {@html getSelectionLabel(item)}
</div>