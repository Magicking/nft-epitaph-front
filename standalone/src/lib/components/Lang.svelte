      <!-- Language Buttons for Desktop  - May use later on-->

<div>
      <div class=" items-center hidden md:flex space-x-2">
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
      </div>
      <div class="mr-2 flex md:hidden">
        <!-- Mobile menu button -->
        <button
          on:click={toggleMenu}
          class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
        >
          <span class="sr-only">Open main menu</span>
          <!-- Icon when menu is closed. -->
          <svg
            class="{menuOpen ? 'hidden' : 'block'} h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
          <!-- Icon when menu is open. -->
          <svg
            class="{menuOpen ? 'block' : 'hidden'} h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
</div>
