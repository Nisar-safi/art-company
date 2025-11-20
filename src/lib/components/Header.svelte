<script>
	import { navigation, company } from '$lib/utils/stores.js';

	export let mobileMenuOpen = false;

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	$: links = $navigation?.links || [];
	$: companyName = $company?.name || 'My Company';
	$: companyLogo = $company?.logo;
</script>

<header
	class="sticky top-0 z-50 border-b border-gray-200/50 bg-white/90 shadow-lg backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/90"
>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-20 items-center justify-between">
			<!-- Logo -->
			<a href="/" class="group flex items-center space-x-3">
				{#if companyLogo}
					<img
						src={companyLogo}
						alt={companyName}
						class="h-10 w-auto object-contain transition-transform group-hover:scale-105"
					/>
				{/if}
				<span class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{companyName}
				</span>
			</a>

			<!-- Desktop Navigation -->
			<nav class="hidden items-center space-x-10 md:flex">
				{#each links as link}
					<a
						href={link.href}
						class="relative text-base font-medium text-gray-700 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-blue-600 after:transition-transform after:duration-300 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-500 {link.active
							? 'text-blue-600 after:scale-x-100 dark:text-blue-500'
							: ''} hover:after:scale-x-100"
						on:click={closeMobileMenu}
					>
						{link.text}
					</a>
				{/each}
			</nav>

			<!-- Mobile Menu Button -->
			<button
				on:click={toggleMobileMenu}
				class="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 md:hidden dark:text-gray-300 dark:hover:bg-gray-800"
				aria-label="Toggle menu"
			>
				<svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
					/>
				</svg>
			</button>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if mobileMenuOpen}
		<div
			class="absolute top-full right-0 left-0 border-b border-gray-200 bg-white/95 shadow-2xl backdrop-blur-lg md:hidden dark:border-gray-800 dark:bg-gray-900/95"
		>
			<nav class="space-y-6 px-6 py-8">
				{#each links as link}
					<a
						href={link.href}
						class="block text-xl font-medium text-gray-800 transition-colors hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-500 {link.active
							? 'text-blue-600 dark:text-blue-500'
							: ''}"
						on:click={closeMobileMenu}
					>
						{link.text}
					</a>
				{/each}
			</nav>
		</div>
	{/if}
</header>
