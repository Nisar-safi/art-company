<script>
	import { company } from '$lib/utils/stores.js';

	$: currentCompany = $company;
</script>

{#if currentCompany.contact || currentCompany.social}
	<div class="company-info">
		<div class="info-grid">
			{#if currentCompany.contact}
				<div class="contact-section">
					<h2>Contact Us</h2>
					<div class="contact-details">
						{#if currentCompany.contact.email}
							<div class="contact-item">
								<strong>Email:</strong>
								<a href="mailto:{currentCompany.contact.email}">{currentCompany.contact.email}</a>
							</div>
						{/if}
						{#if currentCompany.contact.phone}
							<div class="contact-item">
								<strong>Phone:</strong>
								<a href="tel:{currentCompany.contact.phone}">{currentCompany.contact.phone}</a>
							</div>
						{/if}
						{#if currentCompany.contact.address}
							<div class="contact-item">
								<strong>Address:</strong>
								<div class="address">{currentCompany.contact.address}</div>
							</div>
						{/if}
					</div>
				</div>
			{/if}

			{#if currentCompany.social}
				<div class="social-section">
					<h2>Follow Us</h2>
					<div class="social-links">
						{#if currentCompany.social.facebook}
							<a
								href={currentCompany.social.facebook}
								target="_blank"
								rel="noopener"
								class="social-link"
							>
								<span class="social-icon">📘</span>
								Facebook
							</a>
						{/if}
						{#if currentCompany.social.twitter}
							<a
								href={currentCompany.social.twitter}
								target="_blank"
								rel="noopener"
								class="social-link"
							>
								<span class="social-icon">🐦</span>
								Twitter
							</a>
						{/if}
						{#if currentCompany.social.instagram}
							<a
								href={currentCompany.social.instagram}
								target="_blank"
								rel="noopener"
								class="social-link"
							>
								<span class="social-icon">📷</span>
								Instagram
							</a>
						{/if}
						{#if currentCompany.social.linkedin}
							<a
								href={currentCompany.social.linkedin}
								target="_blank"
								rel="noopener"
								class="social-link"
							>
								<span class="social-icon">💼</span>
								LinkedIn
							</a>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	:root {
		--primary: #3b82f6;
		--primary-dark: #2563eb;
		--text: #1f2937;
		--text-light: #6b7280;
		--bg: #ffffff;
		--bg-light: #f9fafb;
		--border: #e5e7eb;
		--shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}

	.company-info {
		background: var(--bg-light);
		padding: 3rem 2rem;
		border-radius: 12px;
		margin-top: 4rem;
	}

	.info-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		max-width: 800px;
		margin: 0 auto;
	}

	.contact-section h2,
	.social-section h2 {
		margin-bottom: 1.5rem;
		color: var(--text);
	}

	.contact-details {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.contact-item {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.contact-item strong {
		color: var(--text);
	}

	.contact-item a {
		color: var(--primary);
		text-decoration: none;
	}

	.contact-item a:hover {
		text-decoration: underline;
	}

	.address {
		white-space: pre-line;
		line-height: 1.5;
	}

	.social-links {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.social-link {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		background: var(--bg);
		border-radius: 8px;
		text-decoration: none;
		color: var(--text);
		transition: all 0.2s;
		border: 1px solid var(--border);
	}

	.social-link:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow);
		color: var(--primary);
	}

	.social-icon {
		font-size: 1.25rem;
	}

	@media (max-width: 768px) {
		.info-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}
</style>
