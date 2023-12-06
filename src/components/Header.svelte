<script>
  import { page } from "$app/stores";
  import { locale, translation } from "../lib/stores/i18n";

  $: t = $translation;

  function setLanguage(lang) {
    locale.set(lang);
    history.back();
  }
</script>

<header class="w-full">
  <!-- <div class="corner flex items-center bg-black">
    <img src={scythe} alt="GPT4 SVG drawn scythe" />
  </div> -->
  <nav class="w-full justify-center items-center text-white bg-black">
    <!-- <img src="/src/lib/ui/images/chibi_knight.png" class="h-20" alt="" /> -->
    <svg viewBox="0 0 2 3" aria-hidden="true">
      <path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
    </svg>
    <ul>
      <!-- <li class="text-black">
        <img src={scythe} alt="GPT4 SVG drawn scythe" />
      </li> -->
      <li
        class="rainbowText"
        aria-current={$page.url.pathname === "/" ? "page" : undefined}
      >
        <a href="/"> {t("Header.Graveyard")} </a>
      </li>
      <li
        class="rainbowText"
        aria-current={$page.url.pathname === "/about" ? "page" : undefined}
      >
        <a href="/mint">{t("Header.Souldraw")}</a>
      </li>
      <li
        class="rainbowText"
        aria-current="{$page.url.pathname.startsWith('/ethers/set')
          ? 'page'
          : undefined}x"
      >
        <a href="/connect">{t("Header.Wallet")}</a>
      </li>
      <label class="relative inline-flex items-center cursor-pointer">
        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
          >English</span
        >
        <input type="checkbox" bind:checked={lang} class="sr-only peer" />

        <div
          class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
        ></div>
        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
          >French</span
        >
      </label>
    </ul>
    <svg viewBox="0 0 2 3" aria-hidden="true">
      <path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
    </svg>
  </nav>

  <!-- <div class="corner flex items-center">
    <img src={scythe} alt="GPT4 SVG drawn scythe" />
  </div> -->
  <!-- 
    background-image: url("/src/lib/ui/images/header_bg.png");
        background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

   -->
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    border: 1px solid #4cc9ff;
  }
  nav {
    display: flex;
    justify-content: center;
    height: 6rem;
    --background: rgba(0, 0, 0, 0.7);
  }

  svg {
    width: 2em;
    height: 3em;
    display: block;
  }

  path {
    fill: var(--background);
  }

  ul {
    position: relative;
    padding: 0;
    margin: 0;
    height: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    background: var(--background);
    background-size: contain;
  }

  li {
    position: relative;
    height: 100%;
  }

  li[aria-current="page"]::before {
    --size: 6px;
    content: "";
    width: 0;
    font-weight: bold;
    height: 0;
    position: absolute;
    top: 0;
    left: calc(50% - var(--size));
    border: var(--size) solid transparent;
    border-top: var(--size) solid var(--color-theme-1);
  }

  nav a {
    display: flex;
    height: 100%;
    align-items: center;
    padding: 0 0.5rem;
    /* color: var(--color-text); */
    font-weight: 700;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-decoration: none;
    transition: color 0.2s linear;
  }

  a:hover {
    color: var(--color-theme-1);
  }

  /* Rainbow Text */
  .rainbowText {
    font-size: 70px;
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
