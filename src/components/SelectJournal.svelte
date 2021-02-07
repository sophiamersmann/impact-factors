<script>
  import Select from 'svelte-select';
  import SelectItem from './components/SelectItem.svelte';

  import { journals } from './inputs/constants';
  import { selectedJournal } from './stores/selections';

  function handleSelect(event) {
    selectedJournal.set(event.detail.value);
  }
</script>

<div class="select">
  <Select
    items={journals}
    Item={SelectItem}
    selectedValue={journals[0]}
    isClearable={false}
    showIndicator
    on:select={handleSelect} />
</div>

<style>
  .select {
    color: white;
    --borderFocusColor: white;
    --background: var(--background-color);
    --listBackground: var(--background-color);
    --itemColor: white;
    --itemIsActiveColor: white;    
    --inputColor: white;    
    --itemActiveBackground: var(--background-color);    
    --itemIsActiveBG: var(--background-color);
    --itemHoverBG: white;
    --itemHoverColor: var(--background-color);
    --borderRadius: 5px;
    --listBorderRadius: 5px;
  }
</style>