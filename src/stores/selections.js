import { writable } from 'svelte/store';

export const selectedJournal = writable();
export const maxCitations = writable(Infinity);
