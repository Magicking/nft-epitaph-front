<script>
  import "../app.css";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";


</script>

<div class="min-h-screen bg-stone-900">
  <!-- Header -->
  <Header />

  <!-- All the Content falls here -->
  <slot />

  <!-- Footer -->
  <Footer />
</div>
