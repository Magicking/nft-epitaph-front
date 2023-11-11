<script>
  import {
    defaultEvmStores as evm,
    connected,
    signer,
    signerAddress,
    chainId,
    chainData,
    contracts,
  } from "svelte-ethers-store";
  import { ethers } from "ethers";
  import { page } from '$app/stores';
  import rgeConf from "$lib/rge.conf.json";
  import rgeAbi from "$lib/rge.abi.json";
  evm.attachContract("rge", rgeConf["address"], rgeAbi["abi"]);

  import { GraveyardStore1 } from "../../lib/stores/graveyard.js";

  function getIndex() {
    let i = $page.url.searchParams.get('i')
    if (i === undefined)
      return 0;
    return i;
  }
  </script>

<div>
  {#if $contracts.rge}
        <!-- Display metadata informations -->
        <pre style="color:aliceblue"> {$GraveyardStore1[getIndex()].description}</pre>
       <img
          class="pxl justify-center items-center mx-auto my-4"
          alt="NFT {getIndex()}"
          src={$GraveyardStore1[getIndex()].image}
        />
  {/if}
</div>
