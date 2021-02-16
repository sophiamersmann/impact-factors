<script>
  import { descending, mean, groups } from 'd3-array';

  import Select from 'svelte-select';
  import SelectItem from './SelectItem.svelte';
  import Selection from './Selection.svelte';

  import { selectedJournal } from '../stores/selections';
  import { denormalize } from '../utils/misc';

  export let data = [];

  const journals = groups(data, (d) => d.journal)
    .map(([, values]) => {
      const journal = values[0].journal;
      const impactFactor = mean(values, (d) => d.citedBy);
      return {
        value: journal,
        label: `${denormalize(journal)} (${Math.round(impactFactor)})`,
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
  <div class="label">Select a journal:</div>
  <Select
    items={journals}
    Item={SelectItem}
    {Selection}
    selectedValue={journals[0]}
    isClearable={false}
    showIndicator
    on:select={handleSelect} />
</div>

<style>
  .select {
    color: var(--white);
    --borderFocusColor: var(--white);
    --background: var(--background-color);
    --listBackground: var(--background-color);
    --itemColor: var(--white);
    --itemIsActiveColor: var(--white);    
    --inputColor: #fff;    
    --itemActiveBackground: var(--background-color);    
    --itemIsActiveBG: var(--background-color);
    --itemHoverBG: var(--white);
    --itemHoverColor: var(--background-color);
    --borderRadius: 5px;
    --listBorderRadius: 5px;
  }

  .label {
    margin-bottom: calc(var(--spacing) / 4);
  }
</style>