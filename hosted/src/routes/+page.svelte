<script>
  import {
    defaultEvmStores as evm,
    connected,
    chainId,
  } from "svelte-ethers-store";
  import Hero from "$lib/components/Hero.svelte";
  import Graveyard from "$lib/components/Graveyard.svelte";
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
  <Graveyard />
</div>
