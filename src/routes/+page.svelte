<script>
  import {
    defaultEvmStores as evm,
    connected,
    chainId,
  } from "svelte-ethers-store";
  import Hero from "../components/Hero.svelte";
  import Graveyard from "../components/Graveyard.svelte";
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<div>
  {#if $connected}
    {#if $chainId !== 1}
      TODO: Warning not on Ethereum Mainnet
    {:else}
      <Graveyard />
    {/if}
  {:else}
    <Hero />
  {/if}
</div>
