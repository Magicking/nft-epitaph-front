<script>
  import "../app.css";
  import Header from "../components/Header.svelte";
</script>

<div class="min-h-screen bg-stone-900">
  <Header />

  <!-- <main
    class="flex flex-col  bg-black rounded-lg justify-center px-12 py-8 mx-12 max-w-auto items-strecth "
  > -->
  <slot />
  <!-- </main> -->

  <footer class="flex flex-col items-center py-4">
    <!-- footer content here -->
  </footer>
</div>
