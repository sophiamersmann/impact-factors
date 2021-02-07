<script>
  import { descending, mean, groups } from 'd3-array';

  import Select from 'svelte-select';
  import SelectItem from './SelectItem.svelte';

  import { selectedJournal } from '../stores/selections';

  export let data = [];

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  const journals = groups(data, (d) => d.journal)
    .map(([, values]) => {
      const journal = values[0].journal;
      const impactFactor = mean(values, (d) => d.citedBy);
      return {
        value: journal,
        label: `${capitalize(journal)} (${Math.round(impactFactor)})`,
        impactFactor
      };
    })
    .sort((a, b) => descending(a.impactFactor, b.impactFactor));

  selectedJournal.set(journals[0].value);

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