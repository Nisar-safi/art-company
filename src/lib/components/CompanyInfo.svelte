<script>
  import { _ } from "$lib/translations/index.js";
  import { company } from '$lib/utils/stores.js';
  $: currentCompany = $company;
</script>

{#if currentCompany.contact || currentCompany.social}
  <section class="py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-gray-50 via-white to-sky-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-sky-950/20">
    <div class="max-w-6xl mx-auto">

      <!-- Header -->
      <div class="text-center mb-12 md:mb-16">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent mb-4">
        {$_('companyinfo.get_in_touch')}
        </h2>
        <p class="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        {$_('companyinfo.connect_subtitle')}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

        <!-- Contact Information Card -->
        {#if currentCompany.contact}
          <div class="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-800 p-8 md:p-10 lg:p-12">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 md:mb-10">
              {$_('companyinfo.contact_information')}
            </h3>

            <div class="space-y-8 md:space-y-10">

              {#if currentCompany.contact.email}
                <div class="flex items-center gap-5 group">
                  <div class="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform">
                    <svg class="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="text-sm md:text-base font-medium text-gray-600 dark:text-gray-400">
                      {$_('companyinfo.email')}
                    </p>
                    <a href="mailto:{currentCompany.contact.email}" class="text-lg md:text-xl font-semibold text-sky-600 dark:text-sky-400 hover:underline break-all">
                      {currentCompany.contact.email}
                    </a>
                  </div>
                </div>
              {/if}

              {#if currentCompany.contact.phone}
                <div class="flex items-center gap-5 group">
                  <div class="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform">
                    <svg class="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="text-sm md:text-base font-medium text-gray-600 dark:text-gray-400">
                      {$_('companyinfo.phone')}
                    </p>
                    <a href="tel:{currentCompany.contact.phone}" class="text-lg md:text-xl font-semibold text-sky-600 dark:text-sky-400 hover:underline">
                      {currentCompany.contact.phone}
                    </a>
                  </div>
                </div>
              {/if}

              {#if currentCompany.contact.address}
                <div class="flex items-start gap-5 group">
                  <div class="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform flex-shrink-0">
                    <svg class="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm md:text-base font-medium text-gray-600 dark:text-gray-400">
                      {$_('companyinfo.address')}
                    </p>
                    <p class="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {currentCompany.contact.address}
                    </p>
                  </div>
                </div>
              {/if}
            </div>
          </div>
        {/if}

        <!-- Social Media Buttons (Mobile-Optimized) -->
        {#if currentCompany.social}
          <div class="space-y-5">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center lg:text-left">
              {$_('companyinfo.follow_us')}
            </h3>

            <div class="grid grid-cols-1 gap-4">

              {#if currentCompany.social.instagram}
                <a href={currentCompany.social.instagram} target="_blank" rel="noopener"
                   class="group flex items-center justify-center gap-4 py-5 px-6 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 rounded-2xl text-white font-bold text-lg md:text-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <svg class="w-7 h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98C23.986 15.668 24 15.259 24 12c0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
                  <span class="flex-1 text-center">
                    {$_('companyinfo.follow_on_instagram')}
                  </span>
                  <svg class="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              {/if}

              {#if currentCompany.social.facebook}
                <a href={currentCompany.social.facebook} target="_blank" rel="noopener"
                   class="group flex items-center justify-center gap-4 py-5 px-6 bg-[#1877f2] rounded-2xl text-white font-bold text-lg md:text-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <svg class="w-7 h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  <span class="flex-1 text-center">
                    {$_('companyinfo.like_on_facebook')}
                  </span>
                  <svg class="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              {/if}

              {#if currentCompany.social.twitter}
                <a href={currentCompany.social.twitter} target="_blank" rel="noopener"
                   class="group flex items-center justify-center gap-4 py-5 px-6 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-bold text-lg md:text-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <svg class="w-7 h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  <span class="flex-1 text-center">
                    {$_('companyinfo.follow_on_twitter')}

                  </span>
                  <svg class="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              {/if}

              {#if currentCompany.social.linkedin}
                <a href={currentCompany.social.linkedin} target="_blank" rel="noopener"
                   class="group flex items-center justify-center gap-4 py-5 px-6 bg-[#0a66c2] rounded-2xl text-white font-bold text-lg md:text-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <svg class="w-7 h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9.277h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9.277h3.564v11.175zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  <span class="flex-1 text-center">
                    {$_('companyinfo.connect_on_linkedin')}
                  </span>
                  <svg class="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              {/if}
            </div>
          </div>
        {/if}
      </div>

      <!-- Final CTA Button -->
      <div class="text-center mt-12 md:mt-20">
        <a href="/contact" class="inline-flex items-center px-10 py-5 md:px-14 md:py-7 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white text-xl md:text-2xl font-bold rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
          {$_('companyinfo.start_project_cta')}
        
        
        </a>
      </div>
    </div>
  </section>
{/if}