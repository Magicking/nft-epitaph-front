<script>
  import { range } from "$lib/range.js";
  import { defaultEvmStores as evm, contracts } from "svelte-ethers-store";

  import rgeConf from "$lib/rge.conf.json";
  import rgeAbi from "$lib/rge.abi.json";
  evm.attachContract("rge", rgeConf["address"], rgeAbi["abi"]);
  import { GraveyardStore1 } from "$lib/stores/graveyard.js";
</script>

<div class="min-h-screen">
  {#if $contracts.rge}
    {#await $contracts.rge.totalSupply()}
      <h1 class="text-white text-center h-56">
        Loading...
      </h1>
    {:then totalSupply}
      <div class="flex flex-col items-evenly justify-evenly min-h-[90vh]">
        <p class="py-4 text-white text-center text-3xl">Total {totalSupply}</p>
        {#each range(totalSupply - 5, totalSupply - 0, 1) as tokenId}
          {#if tokenId >= 0 && tokenId < totalSupply && $GraveyardStore1[tokenId]}
            <div class="px-4 mt-2">
              <p class="text-white text-xl pl-10">ID: {tokenId}</p>
              <a href="/epitaph/?i={tokenId}"
                ><img
                  class="pxl justify-center items-center mx-auto my-4"
                  alt="NFT"
                  src={$GraveyardStore1[tokenId].image}
                /></a
              >
            </div>
          {/if}
        {/each}
      </div>
    {/await}
  {/if}
</div>
