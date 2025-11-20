<script>
	import { browser } from '$app/environment';
	import { company, lastUpdate } from '$lib/utils/stores.js';

	$: currentCompany = $company;
	$: lastUpdateTime = $lastUpdate;
</script>

<footer>
	<div class="container">
		<div class="footer-content">
			<div class="footer-info">
				<div class="footer-logo">
					{#if currentCompany.logo}
						<img src={currentCompany.logo} alt={currentCompany.name} class="footer-logo-img" />
					{/if}
					<div>
						<div class="company-name">{currentCompany.name || 'My Company'}</div>
						{#if currentCompany.tagline}
							<div class="company-tagline">{currentCompany.tagline}</div>
						{/if}
					</div>
				</div>

				{#if currentCompany.social}
					<div class="footer-social">
						{#if currentCompany.social.facebook}
							<a href={currentCompany.social.facebook} target="_blank" rel="noopener">📘</a>
						{/if}
						{#if currentCompany.social.twitter}
							<a href={currentCompany.social.twitter} target="_blank" rel="noopener">🐦</a>
						{/if}
						{#if currentCompany.social.instagram}
							<a href={currentCompany.social.instagram} target="_blank" rel="noopener">📷</a>
						{/if}
						{#if currentCompany.social.linkedin}
							<a href={currentCompany.social.linkedin} target="_blank" rel="noopener">💼</a>
						{/if}
					</div>
				{/if}
			</div>

			<div class="footer-meta">
				<div>
					© {new Date().getFullYear()}
					{currentCompany.name || 'My Company'}. All rights reserved.
				</div>
				<div class="last-updated">
					Last updated: {browser ? new Date(lastUpdateTime).toLocaleTimeString() : '...'}
				</div>
				{#if currentCompany.contact && currentCompany.contact.email}
					<div class="footer-contact">
						<a href="mailto:{currentCompany.contact.email}">{currentCompany.contact.email}</a>
					</div>
				{/if}
			</div>
		</div>
	</div>
</footer>

<style>
	:root {
		--primary: #3b82f6;
		--primary-dark: #2563eb;
		--text: #1f2937;
		--text-light: #6b7280;
		--bg: #ffffff;
		--bg-light: #f9fafb;
		--border: #e5e7eb;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	footer {
		background-color: var(--bg-light);
		border-top: 1px solid var(--border);
		padding: 2rem 0;
		margin-top: 5rem;
		color: var(--text-light);
		font-size: 0.9rem;
	}

	.footer-content {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.footer-info {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.footer-logo {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.footer-logo-img {
		height: 40px;
	}

	.company-name {
		font-weight: 600;
		color: var(--text);
	}

	.company-tagline {
		font-size: 0.8rem;
		margin-top: 0.25rem;
	}

	.footer-social {
		display: flex;
		gap: 1rem;
	}

	.footer-social a {
		display: inline-block;
		padding: 0.5rem;
		background: var(--bg);
		border-radius: 6px;
		text-decoration: none;
		font-size: 1.1rem;
		transition: all 0.2s;
	}

	.footer-social a:hover {
		transform: translateY(-2px);
		background: var(--primary);
		color: white;
	}

	.footer-meta {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		text-align: right;
	}

	.footer-contact a {
		color: var(--primary);
		text-decoration: none;
	}

	.footer-contact a:hover {
		text-decoration: underline;
	}

	@media (max-width: 768px) {
		.footer-content {
			flex-direction: column;
			gap: 2rem;
			text-align: center;
		}

		.footer-meta {
			text-align: center;
		}

		.footer-logo {
			justify-content: center;
		}
	}
</style>
