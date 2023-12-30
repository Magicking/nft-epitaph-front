<script>
  import { createNymMixnetClient } from '@nymproject/sdk-full-fat';
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
  const nym = createNymMixnetClient().then((nym) => {
	  const nymApiUrl = 'https://validator.nymtech.net/api';

	  // show message payload content when received 
	  nym.events.subscribeToTextMessageReceivedEvent((e) => {
		console.log('Got a message: ', e.args.payload);
	  });

	  // start the client and connect to a gateway
	  nym.client.start({
		clientId: '5usp3LDVpP1ynVPZWajJX9C4iG7Xzkr52634SosVAJEw.6myNyP1j47KgagQR6oob42XQ37NcNv3zuZ57xfD1MJPe@E663uLmyqwZaoGukuEcqvrt9UH9t91gKg1rWTD5Asehm',
		nymApiUrl,
	  }).then((e) => {
	  window.nym = nym;
		console.log('Nym client started');
  // send a message to yourself
		console.log(e);
	  });
		console.log('Nym client started');
  });
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
