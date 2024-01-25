<script>
  import { page } from "$app/stores";
  import { onDestroy, onMount } from "svelte";
  import { locale, translation } from "$lib/stores/i18n";

  $: t = $translation;
  $: lang = $locale;

  let menuOpen = false;
  let deviceWidth;
  let device;

  function updateDeviceWidth() {
    deviceWidth = window.innerWidth;
    device = deviceWidth > 768 ? "desktop" : "mobile";
  }

  onMount(() => {
    if (typeof window !== "undefined") {
      updateDeviceWidth();

      window.addEventListener("resize", updateDeviceWidth);
    }
  });

  // onDestroy(() => {
  //   window.removeEventListener("resize", updateDeviceWidth);
  // });

  function setLanguage(lang) {
    locale.set(lang);
  }

  function toggleMenu() {
    menuOpen = !menuOpen;
  }
</script>

<header class="bg-gray-800 text-white">
  <div class="px-10">
    <div class="flex w-full md:flex-row justify-between h-16">
      <div class="flex items-center">
        <h4 class="text-sm"><a href="/">RG Epitaph</a></h4>
      </div>
      <div class="hidden md:flex items-center">
        <div class="ml-10 flex items-center space-x-4">
          <p
            class="rainbowText"
            aria-current={$page.url.pathname === "/" ? "page" : undefined}
          >
            <a href="/"> {t("Header.Graveyard")} </a>
          </p>
          <p
            class="rainbowText"
            aria-current={$page.url.pathname === "/mint" ? "page" : undefined}
          >
            <a href="/mint">{t("Header.Souldraw")}</a>
          </p>
      <!--
          <p
            class="rainbowText"
            aria-current={$page.url.pathname === "/nymmint" ? "page" : undefined}
          >
            <a href="/nymmint">{t("Header.SouldrawNym")}
            </a>
          </p>
		  -->
          <p
            class="rainbowText"
            aria-current={$page.url.pathname.startsWith("/connect")
              ? "page"
              : undefined}
          >
            <a href="/connect">{t("Header.Wallet")}</a>
          </p>
        </div>
      </div>
    </div>
  </div>
  <!-- Mobile menu, show/hide based on menu state -->
  <div class="{menuOpen ? 'block' : 'hidden'} md:hidden bg-gray-800">
    <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
      <!-- Duplicate Navigation links for mobile -->
      <a
        href="/"
        class="block px-3 py-2 rounded-md text-sm text-white hover:bg-gray-700"
      >
        {t("Header.Graveyard")}
      </a>
      <a
        href="/mint"
        class="block px-3 py-2 rounded-md text-sm text-white hover:bg-gray-700"
      >
        {t("Header.Souldraw")}
      </a>
      <!--
      <a
        href="/nymmint"
        class="block px-3 py-2 rounded-md text-sm text-white hover:bg-gray-700"
      >
        {t("Header.SouldrawNym")}
      </a>
	  -->
      <a
        href="/connect"
        class="block px-3 py-2 rounded-md text-sm text-white hover:bg-gray-700"
      >
        {t("Header.Wallet")}
      </a>
      <!-- Language Buttons for mobile  - May use later on-->
      <!-- <div class="px-3 py-2">
        <button
          class="px-3 py-2 rounded-md text-sm font-small {lang === 'en-US'
            ? 'bg-gray-900'
            : 'bg-gray-700 hover:bg-gray-600'}"
          on:click={() => setLanguage("en-US")}
        >
          English
        </button>
        <button
          class="px-3 py-2 rounded-md text-sm font-small {lang === 'fr-FR'
            ? 'bg-gray-900'
            : 'bg-gray-700 hover:bg-gray-600'}"
          on:click={() => setLanguage("fr-FR")}
        >
          Français
        </button>
      </div> -->
    </div>
  </div>
</header>

<style>
  /* Rainbow Text */
  .rainbowText {
    /* font-size: 70px; */
    color: white;
    -webkit-background-clip: text;
  }
  .rainbowText:hover {
    background-image: linear-gradient(
      to right,
      red,
      orange,
      yellow,
      green,
      rgb(255, 0, 43),
      rgb(252, 123, 252)
    );
    animation: move 140s linear infinite;
    -webkit-text-fill-color: transparent;
  }

  @keyframes move {
    to {
      background-position: 4500vh;
    }
  }
</style>
