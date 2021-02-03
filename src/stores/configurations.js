import { readable, derived } from 'svelte/store';

export const duration = readable(400);
export const shortDuration = derived(duration, $duration => $duration / 2);
export const longDuration = derived(duration, $duration => 2 * $duration);
