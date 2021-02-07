import { writable } from 'svelte/store';

import { journals } from '../inputs/constants';

export const selectedJournal = writable(journals[0].value);
export const selectedStar = writable();

export const activeQuantile = writable(1);
export const maxCitations = writable(Infinity);
