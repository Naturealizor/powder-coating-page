import { writable } from 'svelte/store';

// Create a writable store for the selected color with a default value
export const selectedColor = writable<string>('#FF0000'); // Default to red 