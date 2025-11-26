<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { marked } from 'marked';
	import { page, company, navigation, lastUpdate } from '$lib/utils/stores.js';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	

    let isRTL = false;

    onMount(() => {
        isRTL = document.dir === 'rtl' || document.documentElement.dir === 'rtl';
    });

	let mobileMenuOpen = false;
	let currentHeroSlide = 0;
	let heroImages = [];

	$: {
		if ($page.heroSlides && Array.isArray($page.heroSlides) && $page.heroSlides.length > 0) {
			heroImages = $page.heroSlides;
		} else if ($page.image) {
			heroImages = [{ image: $page.image, title: $page.title, subtitle: $page.subtitle }];
		} else {
			heroImages = [];
		}
	}

	let heroInterval;
	onMount(() => {
		if (heroImages.length > 1) {
			heroInterval = setInterval(() => {
				currentHeroSlide = (currentHeroSlide + 1) % heroImages.length;
			}, 4500);
		}
		return () => clearInterval(heroInterval);
	});

	function goToHeroSlide(index) {
		currentHeroSlide = index;
		clearInterval(heroInterval);
		if (heroImages.length > 1) {
			heroInterval = setInterval(() => {
				currentHeroSlide = (currentHeroSlide + 1) % heroImages.length;
			}, 4500);
		}
	}

	async function load() {
		if (!browser) return;
		const ts = Date.now();
		try {
			const [p, c, n] = await Promise.all([
				fetch(`/content/pages/about.json?t=${ts}`),
				fetch(`/content/company.json?t=${ts}`),
				fetch(`/content/navigation.json?t=${ts}`)
			]);
			if (p.ok) page.set(await p.json());
			if (c.ok) company.set(await c.json());
			if (n.ok) navigation.set(await n.json());
		} catch (e) {
			console.error('Fetch failed:', e);
		}
		lastUpdate.set(Date.now());
	}

	onMount(() => {
		load();
	});
</script>

<svelte:head>
	<title>{$company.name || 'My Company'} - {$page.title || 'About'}</title>
	<meta name="description" content={$page.subtitle || 'Learn more about our company'} />
</svelte:head>

<Header {mobileMenuOpen} />

<main class="min-h-screen">
	<!-- Hero Slider -->
	{#if heroImages.length > 0}
		<section class="relative h-[500px] overflow-hidden md:h-[650px] lg:h-[780px]">
			{#each heroImages as slide, i}
				{@const img = typeof slide === 'string' ? slide : slide.image}
				{@const title = slide.title || $page.title}
				{@const subtitle = slide.subtitle || $page.subtitle}

				<div
					class="absolute inset-0 transition-opacity duration-1000 ease-in-out {currentHeroSlide ===
					i
						? 'opacity-100'
						: 'opacity-0'}"
				>
					<img src={img} alt={title} class="h-full w-full object-cover" />
					<div
						class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
					></div>

					<div class="absolute inset-0 flex items-center justify-center px-6 text-center">
						<div class="animate-in fade-in slide-in-from-bottom max-w-5xl duration-1000">
							{#if title}
								<h1
									class="text-4xl leading-tight font-bold text-white drop-shadow-2xl md:text-6xl lg:text-7xl"
								>
									{title}
								</h1>
							{/if}
							{#if subtitle}
								<p
									class="mx-auto mt-6 max-w-3xl text-lg font-light text-white/90 drop-shadow-lg md:text-2xl lg:text-3xl"
								>
									{subtitle}
								</p>
							{/if}
						</div>
					</div>
				</div>
			{/each}

			<!-- Navigation Dots & Arrows (same as home page) -->
			{#if heroImages.length > 1}
				<div class="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-3">
					{#each heroImages as _, i}
						<button
							on:click={() => goToHeroSlide(i)}
							class="h-3 w-3 rounded-full transition-all duration-300 {currentHeroSlide === i
								? 'w-12 bg-white'
								: 'bg-white/60 hover:bg-white/90'}"
							aria-label="Slide {i + 1}"
						/>
					{/each}
				</div>

				<button
					on:click={() =>
						goToHeroSlide((currentHeroSlide - 1 + heroImages.length) % heroImages.length)}
					class="absolute top-1/2 left-6 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-4xl text-white opacity-80 backdrop-blur transition-all hover:bg-white/40 hover:opacity-100"
					aria-label="Previous">
					  {isRTL ? '›' : '‹'}
					</button
				>
				<button
					on:click={() => goToHeroSlide((currentHeroSlide + 1) % heroImages.length)}
					class="absolute top-1/2 right-6 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-4xl text-white opacity-80 backdrop-blur transition-all hover:bg-white/40 hover:opacity-100"
					aria-label="Next">
					{isRTL ? '‹' : '›'}
					</button
				>
			{/if}
		</section>
	{/if}

	<!-- Main Content -->
	<section
		class="bg-gradient-to-b from-gray-50/50 to-white px-4 py-20 dark:from-gray-900 dark:to-black"
	>
		<div class="mx-auto max-w-4xl">
			<div class="prose prose-lg max-w-none dark:prose-invert">
				{@html marked($page.body || 'About our company.')}
			</div>
		</div>
	</section>

	<!-- Team Section -->
	{#if $page.team && $page.team.length > 0}
		<section class="bg-white py-20 dark:bg-gray-900">
			<div class="mx-auto max-w-7xl px-4">
				<div class="mb-16 text-center">
					<h2 class="mb-6 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
						Meet Our Team
					</h2>
					<p class="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-400">
						The talented professionals behind our success
					</p>
				</div>

				<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{#each $page.team as member}
						<div
							class="rounded-2xl bg-gray-50 p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-gray-800"
						>
							{#if member.photo}
								<img
									src={member.photo}
									alt={member.name}
									class="mx-auto mb-6 h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg dark:border-gray-700"
								/>
							{:else}
								<div
									class="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-sky-600 text-2xl font-bold text-white shadow-lg"
								>
									{member.name
										.split(' ')
										.map((n) => n[0])
										.join('')}
								</div>
							{/if}

							<h3 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
								{member.name}
							</h3>
							<p class="mb-4 font-semibold text-sky-600 dark:text-sky-400">
								{member.position}
							</p>
							<p class="leading-relaxed text-gray-600 dark:text-gray-400">
								{member.bio}
							</p>
						</div>
					{/each}
				</div>
			</div>
		</section>
	{/if}
</main>

<Footer />

<style>
	:global(body) {
		font-family:
			'Inter',
			system-ui,
			-apple-system,
			sans-serif;
	}
	.animate-in {
		animation: fadeIn 1.2s ease-out;
	}
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
