<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.png';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>نيسر إس إف آي - NisarSfi Software Industry | تطوير برمجيات ومواقع ويب مخصصة</title>

  <link rel="icon" href={favicon} />

  <!-- Main description -->
  <meta name="description" content="نبني برمجيات مخصصة ومواقع ويب كاملة من الصفر بأحدث التقنيات • حلول رقمية مبتكرة لنمو أعمالك" />

  <!-- Open Graph -->
  <meta property="og:title" content="نيسر إس إف آي - NisarSfi Software Industry" />
  <meta property="og:description" content="تطوير برمجيات مخصصة ومواقع ويب احترافية من الصفر" />
  <meta property="og:image" content="https://art-company.vercel.app/og-preview.jpg" />
  <meta property="og:url" content="https://art-company.vercel.app/" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="NisarSfi Software Industry" />
  <meta property="og:locale" content="ar_AR" />

  <!-- Twitter -->
 <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@ZawanFiker" />
  <meta name="twitter:creator" content="@ZawanFiker" />
  <meta name="twitter:title" content="نيسر إس إف آي | تطوير برمجيات ومواقع ويب" />
  <meta name="twitter:description" content="حلول تقنية مبتكرة تساعد أعمالك على النمو الرقمي." />
  <meta name="twitter:image" content="https://art-company.vercel.app/og-preview.jpg" />
  <meta name="twitter:image:alt" content="معاينة لشركة نيسر إس إف آي" />
  <!-- SEO basics -->
  <meta name="robots" content="index, follow" />
  <meta name="keywords" content="تطوير برمجيات, مواقع ويب, حلول رقمية, استشارات تقنية, نيسر إس إف آي" />
  <link rel="canonical" href="https://art-company.vercel.app/" />
</svelte:head>

{@render children()}
