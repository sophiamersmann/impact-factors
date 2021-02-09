import { readable, writable, derived } from 'svelte/store';

export const starRadius = readable({ min: 0.5, max: 6 });

export const size = writable();
export const panelWidth = writable();

export const margin = derived(starRadius, $starRadius => $starRadius.max);

export const innerRadius = derived(size, $size => 0.25 * ($size / 2));
export const outerRadius = derived([size, margin], ([$size, $margin]) => ($size - 2 * $margin) / 2);
