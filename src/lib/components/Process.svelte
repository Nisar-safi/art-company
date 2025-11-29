<script>
	import { onMount } from 'svelte';
	let isRTL = false;

	onMount(() => {
		isRTL = document.dir === 'rtl' || document.documentElement.dir === 'rtl';
	});
	export let processData = {};

	$: steps = processData.steps || [];
</script>

{#if steps.length > 0}
	<section
		class="overflow-hidden bg-gradient-to-b from-gray-50/70 via-white to-gray-50 px-6 py-24 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900"
	>
		<div class="mx-auto max-w-7xl">
			<!-- Header -->
			<div class="mb-20 text-center">
				<h2 class="mb-6 text-5xl leading-tight font-bold text-gray-900 md:text-6xl dark:text-white">
					{processData.title}
				</h2>
				<p
					class="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600 md:text-2xl dark:text-gray-400"
				>
					{processData.description}
				</p>
			</div>

			<!-- Horizontal Timeline -->
			<div class="relative">
				<!-- Background Line -->
				<div
					class="absolute top-28 right-0 left-0 hidden h-1 bg-gradient-to-r from-transparent via-sky-300 to-transparent md:top-32 lg:block"
				></div>

				<div class="relative grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
					{#each steps as step, i}
						{@const stepNum = String(i + 1).padStart(2, '0')}

						<div class="group relative flex flex-col items-center text-center">
							<!-- Number Circle -->
							<div
								class="group-hover:shadow-3xl relative z-20 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-2xl ring-8 ring-white/80 transition-all duration-500 group-hover:scale-110 group-hover:ring-sky-200 md:h-28 md:w-28 dark:bg-gray-900 dark:ring-gray-900/80 dark:group-hover:ring-sky-800"
							>
								<span
									class="bg-gradient-to-br from-sky-500 to-cyan-500 bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl"
								>
									{stepNum}
								</span>
							</div>

							<!-- Connecting Line (not on last item) -->
							{#if i < steps.length - 1}
								<div
									class="absolute top-14 left-1/2 -z-10 hidden h-1 w-full bg-gradient-to-r from-sky-400 via-cyan-400 to-transparent opacity-70 lg:block"
								></div>
							{/if}

							<!-- Icon -->
							<div class="mt-10 mb-6 text-6xl">
								{step.icon || '✓'}
							</div>

							<!-- Card -->
							<div
								class="mx-auto mt-6 w-full max-w-sm rounded-3xl border border-gray-200/50 bg-white/90 p-8 shadow-xl backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-4 hover:border-sky-300 hover:shadow-2xl dark:border-gray-700/70 dark:bg-gray-800/95 dark:hover:border-sky-700"
							>
								<h3 class="mb-4 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
									{step.title}
								</h3>
								<p class="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
									{step.description}
								</p>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Optional CTA -->
			{#if processData.cta}
				<div class="mt-20 text-center">
					<a
						href={processData.cta.link || '/contact'}
						class="hover:shadow-3xl inline-flex transform items-center gap-3 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-5 text-xl font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:from-sky-600 hover:to-cyan-600"
					>
						{processData.cta.text || 'Get Started Today'}

						<!-- RTL-aware arrow -->
						<svg
							class={`h-6 w-6 transition-transform 
					${isRTL ? 'rotate-180 group-hover:-translate-x-2' : 'group-hover:translate-x-2'}
				`}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2.5"
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							/>
						</svg>
					</a>
				</div>
			{/if}
		</div>
	</section>
{/if}
