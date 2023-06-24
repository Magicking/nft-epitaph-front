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
        RemoteBench3: () => evm.setProvider("http://51.159.29.99:38545", 3),
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

  const enable = async () => {
    pending = true;
    let WalletConnectProvider = window.WalletConnectProvider.default;
    const provider = new WalletConnectProvider({
      infuraId: import.meta.env.VITE_INFURA_API_KEY,
    });
    //  Enable session (triggers QR Code modal)
    await provider.enable();
    evm.setProvider(provider);
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
      on:click={enable}>Connect with Web3modal</button
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
