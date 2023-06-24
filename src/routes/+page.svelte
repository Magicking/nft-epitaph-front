<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<script>
	import { defaultEvmStores as evm, connected, chainId, chainData, contracts } from 'svelte-ethers-store'
	import Providers from '$lib/Providers.svelte'
	import Graveyard from '$lib/Graveyard.svelte'
  </script>
  
<div>
  {#if $connected }
  {#if $chainId !== 1 }
	TODO: Warning not on Ethereum Mainnet
	{:else}
		<Graveyard />
	{/if}
  {:else}
		<Providers />
  {/if}
</div>