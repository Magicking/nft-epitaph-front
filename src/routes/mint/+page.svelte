<script>
  import { defaultEvmStores as evm, contracts, connected, chainId } from "svelte-ethers-store";
  import Hero from "$lib/components/Hero.svelte";
  import Mint from "$lib/components/Mint.svelte";
  import { onMount } from "svelte";
  import { useConnectToWallet } from "$lib/utils/useConnectToWallet";
  import rgeConf from "$lib/rge.conf.json";
  import rgeAbi from "$lib/rge.abi.json";
  evm.attachContract("rge", rgeConf["address"], rgeAbi["abi"]);

  onMount(() => {
    useConnectToWallet();
  });
</script>
<div>
  {#if $connected}
    {#if $chainId !== 1}
      TODO: Warning not on Ethereum Mainnet
    {:else}
    <Mint/>
    {/if}
  {:else}
    <Hero />
  {/if}
</div>