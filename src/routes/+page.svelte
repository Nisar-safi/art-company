<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { marked } from 'marked';
	import { page, company, navigation, carousel, process, lastUpdate} from '$lib/utils/stores.js';
	import Header from '$lib/components/Header.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
	import Process from '$lib/components/Process.svelte';
	import CompanyInfo from '$lib/components/CompanyInfo.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let mobileMenuOpen = false;

	// Hero Slider Logic
	let currentHeroSlide = 0;
	let heroImages = [];

	$: {
		if ($page.heroSlides && Array.isArray($page.heroSlides) && $page.heroSlides.length > 0) {
			heroImages = $page.heroSlides;
		} else if ($page.hero) {
			heroImages = [{ image: $page.hero, title: $page.title, subtitle: $company.tagline }];
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
		heroInterval = setInterval(() => {
			currentHeroSlide = (currentHeroSlide + 1) % heroImages.length;
		}, 4500);
	}

	// Data Loading
	async function load() {
		if (!browser) return;
		const ts = Date.now();
		try {
			const [p, c, n, car, proc] = await Promise.all([
				fetch(`/content/pages/home.json?t=${ts}`),
				fetch(`/content/company.json?t=${ts}`),
				fetch(`/content/navigation.json?t=${ts}`),
				fetch(`/content/carousel/home-carousel.json?t=${ts}`),
				fetch(`/content/process/workflow.json?t=${ts}`)
				
			]);
			if (p.ok) page.set(await p.json());
			if (c.ok) company.set(await c.json());
			if (n.ok) navigation.set(await n.json());
			if (car.ok) carousel.set(await car.json());
			if (proc.ok) process.set(await proc.json());
			
			
		} catch (e) {
			console.error('Fetch failed:', e);
		}
		lastUpdate.set(Date.now());
	}

	onMount(() => {
		load();
		const interval = setInterval(load, 30000);
		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<title>{$company.name || 'My Company'} - {$page.title || 'Home'}</title>
	<meta name="description" content={$company.tagline || 'Welcome to our website'} />
</svelte:head>

<Header {mobileMenuOpen} on:toggle={() => (mobileMenuOpen = !mobileMenuOpen)} />

<main class="min-h-screen">
	<!-- HERO SLIDER - FULLY REPLACED -->
	{#if heroImages.length > 0}
		<section class="relative h-[500px] overflow-hidden md:h-[650px] lg:h-[780px]">
			{#each heroImages as slide, i}
				{@const img = typeof slide === 'string' ? slide : slide.image}
				{@const title = slide.title || $page.title}
				{@const subtitle = slide.subtitle || $company.tagline}

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

					<!-- Text Content -->
					<div class="absolute inset-0 flex items-center justify-center px-6 text-center">
						<div class="animate-in fade-in slide-in-from-bottom max-w-5xl duration-1000">
							{#if title}
								<h1
									class="text-4xl leading-tight font-bold text-white drop-shadow-2xl md:text-6xl lg:text-7xl "
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

			<!-- Dots -->
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

				<!-- Arrows (visible on hover / desktop) -->
				<button
					on:click={() =>
						goToHeroSlide((currentHeroSlide - 1 + heroImages.length) % heroImages.length)}
					class="absolute top-1/2 left-6 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-4xl text-white opacity-80 backdrop-blur transition-all hover:bg-white/40 hover:opacity-100"
					aria-label="Previous">‹</button
				>
				<button
					on:click={() => goToHeroSlide((currentHeroSlide + 1) % heroImages.length)}
					class="absolute top-1/2 right-6 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-4xl text-white opacity-80 backdrop-blur transition-all hover:bg-white/40 hover:opacity-100"
					aria-label="Next">›</button
				>
			{/if}
		</section>
	{/if}

	<!-- Main Content -->
	<section
		class="bg-gradient-to-b from-gray-50/50 to-white px-4 py-20 dark:from-gray-900 dark:to-black"
	>
		<div class="mx-auto max-w-4xl text-center">
			<div class="prose prose-lg max-w-none dark:prose-invert">
				{@html marked($page.body || 'Welcome to our website.')}
			</div>
		</div>
	</section>

	<!-- Your Existing Carousel (Testimonials / Features) -->
	<Carousel carouselData={$carousel} />
	<!-- Process Section -->
	  <Process processData={$process} />

	<!-- Company Info -->
	<CompanyInfo />
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
