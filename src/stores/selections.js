import { writable } from 'svelte/store';

export const selectedJournal = writable();

export const activeQuantile = writable(1);
export const maxCitations = writable(Infinity);
