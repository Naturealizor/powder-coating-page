<!--
  File: src/lib/components/Header.svelte
  A reusable header component with optional actions
-->
<script>
	/** @type {{
        title?: string,
        subtitle?: string,
        actions?: {
            label: string,
            onClick: () => void
        }[]
    }} */
	let { title = 'Header', subtitle = '', actions = [] } = $props();

	const hasActions = $derived(actions.length > 0);
</script>

<header class="bg-white shadow">
	<div class="container mx-auto px-4 py-6">
		<div class="flex items-center justify-between">
			<div>
				<h1 class="text-3xl font-bold text-gray-900">{title}</h1>
				{#if subtitle}
					<p class="mt-1 text-lg text-gray-600">{subtitle}</p>
				{/if}
			</div>

			{#if hasActions}
				<div class="flex gap-3">
					{#each actions as action}
						<button
							class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
							onclick={action.onClick}
						>
							{action.label}
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</header>
