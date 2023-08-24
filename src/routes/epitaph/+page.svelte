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
  import rgeArtifact from "$lib/rge.abi.json";
  evm.attachContract("rge", rgeArtifact["address"], rgeArtifact["abi"]);

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
        <p>ID: {getIndex()}</p>
       <img
          class="pxl justify-center items-center mx-auto my-4"
          alt="NFT"
          src={$GraveyardStore1[getIndex()]["datauri"]}
        />
  {/if}
</div>
