<script>
  import { defaultEvmStores as evm, contracts } from "svelte-ethers-store";
  import { page } from "$app/stores";
  import rgeConf from "$lib/rge.conf.json";
  import rgeAbi from "$lib/rge.abi.json";
  import { rgbToHex, getRgbString } from "$lib/utils/useColorCode.js";
  evm.attachContract("rge", rgeConf["address"], rgeAbi["abi"]);

  import { GraveyardStore1, LoadGraveyardStore } from "$lib/stores/graveyard.js";
  import { onMount } from "svelte";
  import Loading from "$lib/components/shared/Loading.svelte";

  function getIndex() {
    let i = $page.url.searchParams.get("i");
    if (i === undefined) return 0;
    return i;
  }

  // For adding a color changer
  let showRgb = false;
  let isLoading = true;

  onMount(async () => {
	await LoadGraveyardStore();
    isLoading = false;
  });
  $: GraveyardStore1;
</script>

<div>
  {#if isLoading}
    <Loading />
  {:else}
    <div class="text-white p-10">
      <h2>
        Epitaph {getIndex()}ª
      </h2>
      <p>
        In memory of: <span class="technoText" style="word-wrap: break-word;">
          {$GraveyardStore1[getIndex()].attributes[0].memoryOf}
        </span>
      </p>

      <h2 class="my-3">Details</h2>
      <div class="flex flex-col ml-10 gap-y-2">
        <div class="flex items-center justify-start gap-y-3">
          <p class="w-[28rem]">
            Color:
            {#if showRgb}
              {rgbToHex(
                $GraveyardStore1[getIndex()].attributes[1].Red,
                $GraveyardStore1[getIndex()].attributes[2].Green,
                $GraveyardStore1[getIndex()].attributes[3].Red
              )}
            {:else}
              {getRgbString(
                $GraveyardStore1[getIndex()].attributes[1].Red,
                $GraveyardStore1[getIndex()].attributes[2].Green,
                $GraveyardStore1[getIndex()].attributes[3].Red
              )}
            {/if}
          </p>
          <button on:click={() => (showRgb = !showRgb)}>
            {#if showRgb}Show RGB{:else}Show HEX Code{/if}
          </button>
        </div>
        <p>
          Owner: <span class="technoText" style="word-wrap: break-word;">
            {$GraveyardStore1[getIndex()].attributes[6].ownerOf}
          </span>
        </p>
        <p>
          Color Owner: <span
            class="technoText"
            style="word-wrap: break-word;"
            >{$GraveyardStore1[getIndex()].attributes[5].colorOwner}</span
          >
        </p>
        <p>
          Birth Date: {$GraveyardStore1[getIndex()].attributes[9]
            .Day}-{$GraveyardStore1[getIndex()].attributes[8]
            .Month}-{$GraveyardStore1[getIndex()].attributes[7].Year}
        </p>
        <div class="flex items-center">
          <p>Type:&nbsp;</p>
          <button
            class={$GraveyardStore1[getIndex()].attributes[4].tag
              ? "dangerText"
              : "okayText"}
          >
            {$GraveyardStore1[getIndex()].attributes[4].tag ? "Tag" : "Memory"}
          </button>
        </div>
      </div>
    </div>
    <img
      class="pxl justify-center items-center mx-auto my-4 px-4"
      alt="NFT {getIndex()}"
      src={$GraveyardStore1[getIndex()].image}
    />
  {/if}
</div>

<style>
  .okayText {
    color: #00ff00;
  }
  .dangerText {
    color: #ff0000;
  }

  .technoText {
    color: #4cc9f0;
  }

  p {
    font-size: 12px;
    font-weight: 400;
  }
</style>
