<!--
  File: src/lib/components/ColorSelector.svelte
  A component that displays available powder coating colors and handles color selection
-->
<script lang="ts">
	// Import necessary Svelte features
	import { createEventDispatcher } from 'svelte';

	/** @type {{ 
    colors: Array<{
      id: string,
      name: string,
      hex: string,
      price?: number
    }>
  }} */
	let {
		colors = [
			{ id: 'classic-white', name: 'Classic White', hex: '#FFFFFF' },
			{ id: 'matte-black', name: 'Matte Black', hex: '#1A1A1A' },
			{ id: 'candy-red', name: 'Candy Red', hex: '#FF0000' },
			{ id: 'royal-blue', name: 'Royal Blue', hex: '#0041C2' },
			{ id: 'emerald-green', name: 'Emerald Green', hex: '#50C878' },
			{ id: 'metallic-gold', name: 'Metallic Gold', hex: '#FFD700' },
			{ id: 'rose-pink', name: 'Rose Pink', hex: '#FF69B4' },
			{ id: 'pearl-white', name: 'Pearl White', hex: '#F8F8FF' }
		]
	} = $props();

	type ColorEvent = {
		colorSelect: {
			id: string;
			name: string;
			hex: string;
			price?: number;
		};
	};

	// Create event dispatcher for color selection
	const dispatch = createEventDispatcher<ColorEvent>();

	// Track selected color
	let selectedColorId = $state('');

	// Handle color selection
	function handleColorSelect(colorId: string) {
		selectedColorId = colorId;
		const selectedColor = colors.find((c) => c.id === colorId);
		dispatch('colorSelect', selectedColor);
	}
</script>

<div class="color-selector">
	<h2 class="mb-4 text-2xl font-bold">Choose Your Color</h2>
	<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
		{#each colors as color}
			<button
				class="color-option relative rounded-lg border-2 p-4 transition-all duration-200"
				class:selected={selectedColorId === color.id}
				style:background-color={color.hex}
				style:border-color={selectedColorId === color.id ? color.hex : 'transparent'}
				onclick={() => handleColorSelect(color.id)}
			>
				<span
					class="color-name absolute right-0 bottom-0 left-0 rounded-b-lg p-2 text-center text-sm"
					style:background-color="rgba(0, 0, 0, 0.7)"
					style:color="white"
				>
					{color.name}
				</span>
			</button>
		{/each}
	</div>
</div>

<style>
	.color-option {
		aspect-ratio: 1;
		cursor: pointer;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.color-option:hover {
		transform: scale(1.05);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	}

	.color-option.selected {
		transform: scale(1.05);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	}

	.color-name {
		opacity: 0;
		transition: opacity 0.2s ease-in-out;
	}

	.color-option:hover .color-name,
	.color-option.selected .color-name {
		opacity: 1;
	}
</style>
