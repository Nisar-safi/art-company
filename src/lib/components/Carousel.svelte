<script>
	import { onMount } from 'svelte';
	export let carouselData = {};

	let currentSlide = 0;
	$: cards = carouselData.cards || [];
	$: total = cards.length;

	function nextSlide() {
		currentSlide = (currentSlide + 1) % total;
	}

	function prevSlide() {
		currentSlide = (currentSlide - 1 + total) % total;
	}

	function goToSlide(i) {
		currentSlide = i;
	}

	// For infinite loop visual effect
	$: prevIndex = (currentSlide - 1 + total) % total;
	$: nextIndex = (currentSlide + 1) % total;
</script>

{#if total > 0}
	<section
		class="overflow-hidden bg-gradient-to-b from-gray-50 to-white px-4 py-16 dark:from-gray-900 dark:to-black"
	>
		{#if carouselData.title}
			<h2 class="mb-16 text-center text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
				{carouselData.title}
			</h2>
		{/if}

		<div class="relative mx-auto max-w-7xl">
			<!-- Carousel Track -->
			<div class="flex items-center justify-center gap-8">
				<!-- Previous Card (dimmed & smaller) -->
				<div class="hidden flex-shrink-0 lg:block">
					<div class="w-72 scale-90 opacity-50 transition-all duration-700">
						<div
							class="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800"
						>
							<img
								src={cards[prevIndex].image}
								alt={cards[prevIndex].title}
								class="h-64 w-full object-cover"
							/>
							<div class="p-6">
								<h3 class="text-xl font-bold text-gray-800 dark:text-white">
									{cards[prevIndex].title}
								</h3>
								<p class="mt-2 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
									{cards[prevIndex].description}
								</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Center Active Card (large & prominent) -->
				<div class="flex-shrink-0">
					<div class="w-80 scale-100 transition-all duration-700 md:w-96">
						<div
							class="overflow-hidden rounded-3xl border-2 border-blue-500/20 bg-white shadow-2xl ring-4 ring-blue-500/10 dark:bg-gray-800"
						>
							<div class="relative">
								<img
									src={cards[currentSlide].image}
									alt={cards[currentSlide].title}
									class="h-80 w-full object-cover md:h-96"
								/>
								<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
							</div>
							<div class="p-8 md:p-10">
								<h3 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
									{cards[currentSlide].title}
								</h3>
								<p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
									{cards[currentSlide].description}
								</p>

								{#if cards[currentSlide].cta}
									<div class="mt-8">
										<a
											href={cards[currentSlide].cta.link}
											class="inline-flex items-center rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
										>
											{cards[currentSlide].cta.text || 'Learn More'}
											<svg
												class="ml-3 h-5 w-5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M9 5l7 7-7 7"
												/>
											</svg>
										</a>
									</div>
								{/if}
							</div>
						</div>
					</div>
				</div>

				<!-- Next Card (dimmed & smaller) -->
				<div class="hidden flex-shrink-0 lg:block">
					<div class="w-72 scale-90 opacity-50 transition-all duration-700">
						<div
							class="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800"
						>
							<img
								src={cards[nextIndex].image}
								alt={cards[nextIndex].title}
								class="h-64 w-full object-cover"
							/>
							<div class="p-6">
								<h3 class="text-xl font-bold text-gray-800 dark:text-white">
									{cards[nextIndex].title}
								</h3>
								<p class="mt-2 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
									{cards[nextIndex].description}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Navigation Arrows -->
			<button
				on:click={prevSlide}
				class="absolute top-1/2 left-4 z-10 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white/90 text-4xl text-gray-800 shadow-2xl backdrop-blur-lg transition-all hover:bg-blue-600 hover:text-white md:left-10 dark:border-gray-600 dark:bg-gray-800/90 dark:text-white"
			>
				‹
			</button>
			<button
				on:click={nextSlide}
				class="absolute top-1/2 right-4 z-10 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white/90 text-4xl text-gray-800 shadow-2xl backdrop-blur-lg transition-all hover:bg-blue-600 hover:text-white md:right-10 dark:border-gray-600 dark:bg-gray-800/90 dark:text-white"
			>
				›
			</button>

			<!-- Dots -->
			<div class="mt-16 flex justify-center gap-3">
				{#each cards as _, i}
					<button
						on:click={() => goToSlide(i)}
						class="h-3 w-3 rounded-full transition-all duration-300 {i === currentSlide
							? 'w-10 bg-blue-600'
							: 'bg-gray-400 hover:bg-gray-600'}"
						aria-label="Slide {i + 1}"
					/>
				{/each}
			</div>
		</div>
	</section>
{/if}
