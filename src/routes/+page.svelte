<script>
  import {
    defaultEvmStores as evm,
    connected,
    chainId,
    chainData,
    contracts,
  } from "svelte-ethers-store";
  import Graveyard from "$lib/Graveyard.svelte";
  import Hero from "../components/Hero.svelte";
  import WalletSetup from "../components/WalletSetup.svelte";
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
    <WalletSetup />
  {/if}
</div>
