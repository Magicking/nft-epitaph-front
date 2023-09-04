<script>
  import { onMount } from "svelte";
  import { ethers } from "ethers";

  import {
    connected,
    provider,
    signer,
    chainData,
    chainId,
    signerAddress,
    evmProviderType,
    defaultEvmStores as evm,
  } from "svelte-ethers-store";

  import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
  import { Web3Modal } from '@web3modal/html'
  import { configureChains, createConfig } from '@wagmi/core'
  import { mainnet } from '@wagmi/core/chains'

  import { providers } from 'ethers'
 
  export function publicClientToProvider(publicClient) {
    const { chain, transport } = publicClient
    console.log(mainnet);
    console.log(publicClient);
    const network = {
      chainId: chain.id,
      name: chain.name,
      ensAddress: chain.contracts?.ensRegistry?.address,
    }
    if (transport.type === 'fallback')
    return new providers.FallbackProvider(
      (transport.transports).map(
        ({ value }) => new providers.JsonRpcProvider(value?.url, network),
      ),
    )
  return new providers.JsonRpcProvider(transport.url, network)
}


  const chains = [mainnet];
  const projectId = "550b3382ab70a46838a0f1659b4aef43";

  let type;
  let pending = false;

  const connect = async () => {
    pending = true;
    try {
      const handler = {
        Browser: () => evm.setProvider(),
        Localhost: () => evm.setProvider("http://127.0.0.1:8545"),
        Localhost3: () => evm.setProvider("http://127.0.0.1:8545", 3),
        Localhost4: () => evm.setProvider("http://127.0.0.1:8545", 4),
        RemoteBench: () => evm.setProvider("http://51.159.29.99:38545"),
        RemoteBench3: () => evm.setProvider("http://10.61.20.2:8545", 3),
        LocalhostNull: () => evm.setProvider("http://127.0.0.1:8545", null),
        Gnosis: () => evm.setProvider("https://rpc.gnosischain.com"),
        Arbitrum: () => evm.setProvider("https://arb1.arbitrum.io/rpc"),
        Infura: () =>
          evm.setProvider(new ethers.providers.InfuraProvider("goerli"), null),
        Etherscan: () =>
          evm.setProvider(
            new ethers.providers.EtherscanProvider("goerli"),
            null
          ),
        Alchemy: () =>
          evm.setProvider(new ethers.providers.AlchemyProvider("goerli"), null),
        Clouflare: () =>
          evm.setProvider(new ethers.providers.CloudflareProvider(), null),
      };

      console.log(type, handler[type]);
      await handler[type]();
      pending = false;
    } catch (e) {
      console.log(e);
      pending = false;
    }
  };

    const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
    const wagmiConfig = createConfig({
      autoConnect: true,
      connectors: w3mConnectors({ projectId, chains }),
      publicClient
    });
    const ethereumClient = new EthereumClient(wagmiConfig, chains);
    ;
    const web3modal = new Web3Modal({ projectId }, ethereumClient);
    web3modal.subscribeModal(newState => {
      console.log("newstate");
      if (newState.open === false) {
        console.log("connect");
        enable();
      }

      ;});

  const enable = async () => {
    pending = true;
    //  Enable session (triggers QR Code modal)
    const provider = publicClientToProvider(publicClient(mainnet.id));
    evm.setProvider(provider);
    console.log("enable");
    console.log(provider);
    pending = false;
  };

  const disconnect = async () => {
    await evm.disconnect();
    pending = false;
  };

  $: network = $connected ? $provider.getNetwork() : "";
  $: account = $connected && $signer ? $signer.getAddress() : "";
</script>

<div class="content">
  <h1>Wallet setup</h1>

  {#if !$connected}
    <p>Use an external provider</p>

    <button
      class="block mt-4 px-4 py-2 text-base font-medium text-white bg-[#00ff00] rounded-md shadow-md hover:bg-[#008b07] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      disabled={pending}
      on:click={web3modal.openModal()}>Connect with Web3modal</button
    >

    <p class="py-4">Or choose the setProvider method:</p>

    <button
      class="block mt-4 px-4 py-2 text-base font-medium text-white bg-[#00ff00] rounded-md shadow-md hover:bg-[#008b07] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      disabled={pending}
      on:click={connect}>Connect with</button
    >

    <select bind:value={type}>
      <option value="Browser">Browser (window.ethereum)</option>
      <option value="Localhost"
        >Localhost (eg ganache or hardhat on http://127.0.0.1:8545)</option
      >
      <option value="Localhost3">Localhost using account index 3</option>
      <option value="Localhost4">Localhost using account index 4</option>
      <option value="RemoteBench">RemoteBench remote</option>
      <option value="RemoteBench3">RemoteBench3 remote</option>
      <option value="LocalhostNull"
        >Localhost but only provider (no signer)</option
      >
      <option value="Gnosis">https://rpc.gnosischain.com (RPC)</option>
      <option value="Arbitrum">https://arb1.arbitrum.io/rpc (RPC)</option>
      <option value="Infura">ethers.providers.InfuraProvider('goerli')</option>
      <option value="Etherscan"
        >ethers.providers.EtherscanProvider('goerli')</option
      >
      <option value="Alchemy">ethers.providers.AlchemyProvider('goerli')</option
      >
      <option value="Clouflare">ethers.providers.CloudflareProvider()</option>
    </select>

    {#if pending}connecting...{/if}
  {:else}
    <p>
      You are now connected to the account {$signerAddress}.
    </p>
    <p>On the network {$chainData.name} (chainId: {$chainId})</p>

    <button class="button" on:click={disconnect}> Disconnect </button>
  {/if}
</div>

<style>
  select {
    margin-top: 1em;
    padding: 0.5em;
    font-size: 80%;
  }
</style>
