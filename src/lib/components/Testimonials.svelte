<script>
	import { onMount } from 'svelte';
	export let testimonialsData = {};

	let current = 0;
	$: items = testimonialsData.testimonials || [];

	function next() {
		current = (current + 1) % items.length;
	}
	function prev() {
		current = (current - 1 + items.length) % items.length;
	}

	// Gentle auto-play only when not hovered
	let timer;
	onMount(() => {
		timer = setInterval(() => {
			if (items.length > 1) next();
		}, 8000);
		return () => clearInterval(timer);
	});
</script>

{#if items.length > 0}
	<section class="bg-gray-50/70 px-6 py-24 md:py-32 dark:bg-gray-950">
		<div class="mx-auto max-w-6xl">
			<!-- Header -->
			<div class="mb-16 text-center md:mb-20">
				<h2 class="text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
					{testimonialsData.title || 'Client Testimonials'}
				</h2>
				<p class="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-gray-400">
					{testimonialsData.description ||
						'Trusted by leading companies and professionals worldwide'}
				</p>
			</div>

			<!-- Main Testimonial - No movement, pure elegance -->
			<div
				class="relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900"
			>
				<div class="p-12 text-center md:p-20 lg:p-24">
					{#each items as t, i}
						<div
							class:hidden={i !== current}
							class:block={i === current}
							class="transition-opacity duration-1000 ease-in-out {i === current
								? 'opacity-100'
								: 'absolute inset-0 opacity-0'}"
						>
							<!-- Stars -->
							<div class="mb-10 flex justify-center gap-2">
								{#each Array(5) as _, s}
									<span class="text-4xl {s < (t.rating || 5) ? 'text-yellow-400' : 'text-gray-300'}"
										>★</span
									>
								{/each}
							</div>

							<!-- Quote -->
							<blockquote
								class="mx-auto max-w-4xl text-2xl leading-relaxed font-light text-gray-800 italic md:text-3xl lg:text-4xl dark:text-gray-200"
							>
								“{t.text}”
							</blockquote>

							<!-- Client -->
							<div class="mt-16 flex flex-col items-center">
								{#if t.photo}
									<img
										src={t.photo}
										alt={t.name}
										class="mb-6 h-24 w-24 rounded-full object-cover ring-4 ring-gray-100 dark:ring-gray-800"
									/>
								{:else}
									<div
										class="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-cyan-600 text-2xl font-bold text-white ring-4 ring-gray-100 dark:ring-gray-800"
									>
										{t.name
											.split(' ')
											.map((n) => n[0])
											.join('')}
									</div>
								{/if}

								<div class="text-2xl font-bold text-gray-900 dark:text-white">
									{t.name}
								</div>
								<div class="text-lg font-medium text-sky-600 dark:text-sky-400">
									{t.position}
								</div>
								{#if t.company}
									<div class="mt-1 text-gray-600 dark:text-gray-400">
										{t.company}
									</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>

				<!-- Navigation Arrows - Clean & Minimal -->
				{#if items.length > 1}
					<button
						on:click={prev}
						class="absolute top-1/2 left-6 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white text-3xl shadow-lg transition-all hover:border-sky-500 hover:bg-sky-500 hover:text-white dark:border-gray-700 dark:bg-gray-800"
					>
						‹
					</button>
					<button
						on:click={next}
						class="absolute top-1/2 right-6 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white text-3xl shadow-lg transition-all hover:border-sky-500 hover:bg-sky-500 hover:text-white dark:border-gray-700 dark:bg-gray-800"
					>
						›
					</button>
				{/if}

				<!-- Dots - Simple & Professional -->
				{#if items.length > 1}
					<div class="flex justify-center gap-3 pb-10">
						{#each items as _, i}
							<button
								on:click={() => (current = i)}
								class="h-2 w-2 rounded-full transition-all {i === current
									? 'w-10 bg-sky-500'
									: 'bg-gray-400'}"
							/>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</section>
{/if}
