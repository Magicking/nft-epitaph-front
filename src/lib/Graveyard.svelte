<script>
  import { range } from "./range.js";
  import {
    defaultEvmStores as evm,
    connected,
    chainId,
    chainData,
    contracts,
  } from "svelte-ethers-store";

  import rgeArtifact from "./rge.abi.json";
  evm.attachContract("rge", rgeArtifact["address"], rgeArtifact["abi"]);
  import { GraveyardStore1 } from "./stores/graveyard.js";
</script>

<div>
  {#if $contracts.rge}
    {#await $contracts.rge.totalSupply()}
      <span>Fetching blockchain data</span>
    {:then totalSupply}
      <p class="py-4 text-white">Total {totalSupply}</p>
      {#each range($GraveyardStore1.length - 5, $GraveyardStore1.length, 1) as tokenId}
        {#if tokenId >= 0}
          <p>ID: {tokenId}</p>
          <img
            class="pxl justify-center items-center mx-auto my-4"
            alt="NFT"
            src={$GraveyardStore1[tokenId]}
          />
        {/if}
      {/each}
    {/await}
  {/if}
</div>
