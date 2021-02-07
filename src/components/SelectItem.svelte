<script>
  // Adapted from https://github.com/rob-balfre/svelte-select/blob/master/src/Item.svelte

  import CheckMark from './CheckMark.svelte';

  export let isActive = false;
  export let isFirst = false;
  export let isHover = false;
  export let getOptionLabel = undefined;
  export let item = undefined;
  export let filterText = '';

  let itemClasses = '';

  $: {
    const classes = [];
    if (isActive) { classes.push('active'); }
    if (isFirst) { classes.push('first'); }
    if (isHover) { classes.push('hover'); }
    if (item.isGroupHeader) { classes.push('groupHeader'); }
    if (item.isGroupItem) { classes.push('groupItem'); }
    itemClasses = classes.join(' ');
  }
</script>
  
<div class="item {itemClasses}">
  {@html getOptionLabel(item, filterText)}
  {#if isActive}
    <CheckMark />
  {/if}
</div>

<style>
  .item {
    cursor: default;
    height: var(--height, 42px);
    line-height: var(--height, 42px);
    padding: var(--itemPadding, 0 20px);
    color: var(--itemColor, inherit);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .groupHeader {
    text-transform: var(--groupTitleTextTransform, uppercase);
  }

  .groupItem {
    padding-left: var(--groupItemPaddingLeft, 40px);
  }

  .item:active {
    background: var(--itemActiveBackground, #b9daff);
    font-weight: bold;
  }

  .item.active {
    background: var(--itemIsActiveBG, #007aff);
    color: var(--itemIsActiveColor, #fff);
    font-weight: bold;
  }

  .item.first {
    border-radius: var(--itemFirstBorderRadius, 4px 4px 0 0);
  }

  .item.hover {
    background: var(--itemHoverBG, #e7f2ff);
    color: var(--itemHoverColor, #000);
  }
</style>
