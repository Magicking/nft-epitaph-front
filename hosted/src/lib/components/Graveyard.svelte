<script>
  import { onMount } from "svelte";
  import { range } from "$lib/range.js";
  import { defaultEvmStores as evm, contracts } from "svelte-ethers-store";

  import { GraveyardStore1, LoadGraveyardStore, TotalSupply } from "$lib/stores/graveyard.js";
  onMount(async () => {
    // Load the GraveyardStore every 5secs
	await LoadGraveyardStore();
	setInterval(async () => {
	  await LoadGraveyardStore();
	}, 5000);
	console.log(totalSupply);
  });
  $: totalSupply = TotalSupply;
  $: GraveyardStore1;
</script>

<div class="min-h-screen">
  <div class="flex flex-col items-evenly justify-evenly min-h-[90vh]">
    <p class="py-4 text-white text-center text-3xl">Total {$totalSupply}</p>
    {#each range($totalSupply - 0, $totalSupply - 5, 1) as tokenId}
      {#if tokenId >= 0 && tokenId < $totalSupply && $GraveyardStore1[tokenId]}
        <div class="px-4 mt-2">
          <p class="text-white text-xl pl-10">ID: {$GraveyardStore1[tokenId].id}</p>
          <a href="/epitaph/?i={$GraveyardStore1[tokenId].id}"
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
</div>
