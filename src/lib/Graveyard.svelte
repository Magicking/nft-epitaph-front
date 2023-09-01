<script>
  import { range } from "./range.js";
  import {
    defaultEvmStores as evm,
    connected,
    chainId,
    chainData,
    contracts,
  } from "svelte-ethers-store";

  import rgeConf from "./rge.conf.json";
  import rgeAbi from "./rge.abi.json";
  evm.attachContract("rge", rgeConf["address"], rgeAbi["abi"]);
  import { GraveyardStore1 } from "./stores/graveyard.js";
</script>

<div>
  {#if $contracts.rge}
    {#await $contracts.rge.totalSupply()}
      <span>Fetching blockchain data</span>
    {:then totalSupply}
      <p class="py-4 text-white">Total {totalSupply}</p>
      {#each range(totalSupply - 5, totalSupply - 0, 1) as tokenId}
        {#if tokenId >= 0 && tokenId < totalSupply && $GraveyardStore1[tokenId]}
          <p>ID: {tokenId}</p>
          <a href="/epitaph/?i={tokenId}"><img
            class="pxl justify-center items-center mx-auto my-4"
            alt="NFT"
            src={$GraveyardStore1[tokenId]["tokenURI"].image}
          /></a>
        {/if}
      {/each}
    {/await}
  {/if}
</div>
