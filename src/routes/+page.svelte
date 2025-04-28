<!--
  File: src/routes/+page.svelte
  The main home page with powder coating customization
-->
<script>
	import ColorSelector from '$lib/components/ColorSelector.svelte';
	import ModelViewer from '$lib/components/ModelViewer.svelte';
	import Header from '$lib/components/Header.svelte';
	import { selectedColor } from '$lib/stores/colorStore';

	// Define the color selection event type
	/** @type {(event: CustomEvent<{ id: string, name: string, hex: string, price?: number }>) => void} */
	function handleColorSelect(event) {
		$selectedColor = event.detail.hex;
	}

	// Define available colors
	const colors = [
		{ id: 'classic-white', name: 'Classic White', hex: '#FFFFFF' },
		{ id: 'matte-black', name: 'Matte Black', hex: '#1A1A1A' },
		{ id: 'candy-red', name: 'Candy Red', hex: '#FF0000' },
		{ id: 'royal-blue', name: 'Royal Blue', hex: '#0041C2' },
		{ id: 'emerald-green', name: 'Emerald Green', hex: '#50C878' },
		{ id: 'metallic-gold', name: 'Metallic Gold', hex: '#FFD700' },
		{ id: 'rose-pink', name: 'Rose Pink', hex: '#FF69B4' },
		{ id: 'pearl-white', name: 'Pearl White', hex: '#F8F8FF' }
	];
</script>

<Header
	title="Custom Powder Coating"
	subtitle="Transform your KitchenAid mixer with our professional powder coating service"
	actions={[
		{
			label: 'Contact Us',
			onClick: () => (window.location.href = '/contact')
		}
	]}
/>

<div class="container mx-auto px-4 py-8">
	<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
		<!-- 3D Model Viewer -->
		<div class="w-full">
			<ModelViewer />
		</div>

		<!-- Color Selection and Information -->
		<div class="space-y-8">
			<div class="rounded-lg bg-white p-6 shadow-lg">
				<ColorSelector {colors} on:colorSelect={handleColorSelect} />
			</div>

			<div class="rounded-lg bg-white p-6 shadow-lg">
				<h2 class="mb-4 text-2xl font-bold">About Our Powder Coating Service</h2>
				<p class="mb-4 text-gray-700">
					Give your KitchenAid stand mixer a stunning new look with our professional powder coating
					service. Each color is carefully applied to ensure a durable, beautiful finish that will
					last for years to come.
				</p>
				<ul class="list-inside list-disc space-y-2 text-gray-700">
					<li>Professional application process</li>
					<li>Durable, chip-resistant finish</li>
					<li>Food-safe coating</li>
					<li>Custom color options available</li>
					<li>Quick turnaround time</li>
				</ul>
			</div>

			<div class="rounded-lg bg-white p-6 shadow-lg">
				<h2 class="mb-4 text-2xl font-bold">How It Works</h2>
				<ol class="list-inside list-decimal space-y-2 text-gray-700">
					<li>Choose your desired color from our selection</li>
					<li>Ship or bring your mixer to our facility</li>
					<li>We'll carefully disassemble and prep the mixer</li>
					<li>Professional powder coating application</li>
					<li>Quality inspection and reassembly</li>
					<li>Ready for pickup or shipping back to you</li>
				</ol>
			</div>
		</div>
	</div>
</div>
