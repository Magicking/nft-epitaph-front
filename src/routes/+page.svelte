<script>
  import {
    defaultEvmStores as evm,
    connected,
    chainId,
  } from "svelte-ethers-store";
  import Hero from "../components/Hero.svelte";
  import Graveyard from "../components/Graveyard.svelte";
  import { onMount } from "svelte";
  import { useConnectToWallet } from "$lib/utils/useConnectToWallet";


  onMount(() => {
    useConnectToWallet();
  });
</script>

<svelte:head>
  <title>RG Epitaph</title>
  <meta name="description" content="RG Epitaph" />
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
