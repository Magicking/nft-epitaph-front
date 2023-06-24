<script>
  import Header from "./Header.svelte";
  import "../app.css";
</script>

<div class="min-h-screen bg-stone-900">
  <Header />

  <main
    class="flex flex-col bg-black items-center rounded-lg justify-center px-12 py-8 mx-12 max-w-auto"
  >
    <slot />
  </main>

  <footer class="flex flex-col items-center py-4">
    <!-- footer content here -->
  </footer>
</div>
