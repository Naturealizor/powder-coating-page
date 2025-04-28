<script>
	// <!--Old Rune style from Svelte 4-->
	// /** @type {'primary' | 'secondary' | 'outline'} */
	// export let variant = 'primary';

	// /** @type {'sm' | 'md' | 'lg' | 'xl' | '2xl'} */
	// export let size = 'md';

	// /** @type {string} */
	// export let label = '';

	// /** @type {() => void} */
	// export let onClick = () => {};

	// <!--New Rune style from Svelte 5-->
	/** @type {{ 
	  variant?: 'primary' | 'secondary' | 'outline', 
	  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl',
	  label?: string,
	  onClick?: () => void
	}} */
	let { variant = 'primary', size = 'md', label = '', onClick = () => {} } = $props();

	// Compute classes based on props
	const variantClasses = $derived(
		{
			primary: 'bg-blue-600 hover:bg-blue-700 text-white',
			secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
			outline: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50'
		}[variant]
	);

	const sizeClasses = $derived(
		{
			sm: 'text-sm py-1 px-2',
			md: 'text-base py-2 px-4',
			lg: 'text-lg py-3 px-6',
			xl: 'text-xl py-4 px-8',
			'2xl': 'text-2xl py-5 px-10'
		}[size]
	);
</script>

<button
	class="rounded font-medium transition-colors duration-200 {variantClasses} {sizeClasses}"
	onclick={onClick}
>
	{label}
</button>
