<script>
  import { ethers } from "ethers";

  import {
    connected,
    provider,
    signer,
    chainData,
    chainId,
    signerAddress,
    defaultEvmStores as evm,
  } from "svelte-ethers-store";
  import Onboard from "@web3-onboard/core";
  import injectedModule from "@web3-onboard/injected-wallets";
  import walletConnectModule from "@web3-onboard/walletconnect";

  import rgeConf from "$lib/rge.conf.json";
  import rgeAbi from "$lib/rge.abi.json";

  const injected = injectedModule();
  const wcV2InitOptions = {
    /**
     * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
     */
    projectId: "550b3382ab70a46838a0f1659b4aef43",
    /**
     * Chains required to be supported by all wallets connecting to your DApp
     */
    requiredChains: [1],
    /**
     * Defaults to `appMetadata.explore` that is supplied to the web3-onboard init
     * Strongly recommended to provide atleast one URL as it is required by some wallets (i.e. MetaMask)
     * To connect with WalletConnect
     */
    dappUrl: "https://rge.6120.eu/",
  };
  const walletConnect = walletConnectModule(wcV2InitOptions);

  let onboard = Onboard({
    wallets: [injected, walletConnect],
    chains: [
      {
        id: "0x1",
        token: "ETH",
        label: "Ethereum Mainnet",
        rpcUrl: "https://eth.llamarpc.com",
      },
    ],
    appMetadata: {
      name: "NFT EPITAPH",
      description: "Research tokens smarter and faster.",
      recommendedInjectedWallets: [
        { name: "MetaMask", url: "https://metamask.io" },
        { name: "WalletConnect", url: "https://walletconnect.com/" },
      ],
    },
    accountCenter: {
      desktop: {
        enabled: false,
        position: "topRight",
      },
      mobile: {
        enabled: false,
        position: "topRight",
      },
    },
  });
  const walletsSubscription = onboard.state.select("wallets");
  const { unsubscribe } = walletsSubscription.subscribe((wallets) => {
    const walletProvider = wallets[0]?.provider;
    if (walletProvider) {
      const provider = new ethers.providers.Web3Provider(walletProvider, "any");
      evm.setProvider(provider);
      evm.attachContract("rge", rgeConf["address"], rgeAbi["abi"]);
    }
    updateAlreadyConnectedWallets();
  });

  if (typeof window !== "undefined") {
    const alreadyConnectedWallets = JSON.parse(
      window.sessionStorage.getItem("ConnectedWallets")
    );
    if (alreadyConnectedWallets && alreadyConnectedWallets.length > 0) {
      onboard
        .connectWallet({
          autoSelect: {
            label: alreadyConnectedWallets[0],
            disableModals: true,
          },
        })
        .catch(console.error);
    }
  }

  export const connectOnBoard = async () => {
    const wallets = await onboard.connectWallet();
  };
  export const disconnectOnBoard = async () => {
    const connectedWallet = onboard.state.get().wallets[0];
    await onboard.disconnectWallet({ label: connectedWallet.label });
    await evm.disconnect();
  };
  function updateAlreadyConnectedWallets() {
    const connectedWalletsLabels = onboard.state
      .get()
      .wallets.map(({ label }) => label);
    window.sessionStorage.setItem(
      "ConnectedWallets",
      JSON.stringify(connectedWalletsLabels)
    );
  }

  let type;
  let pending = false;

  const connect = async () => {
    pending = true;
    try {
      const handler = {
        Localhost: () => evm.setProvider("http://127.0.0.1:8545"),
        Browser: () => evm.setProvider(),
        Localhost3: () => evm.setProvider("http://127.0.0.1:8545", 3),
        Localhost4: () => evm.setProvider("http://127.0.0.1:8545", 4),
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

<div class="flex h-screen items-center flex-col text-white">
  <h1 class="text-4xl">Wallet Setup</h1>

  {#if !$connected}
    <div>
      <p>Use an external provider</p>

      <button
        class="block mt-4 px-4 py-2 text-base font-medium text-white bg-[#00ff00] rounded-md shadow-md hover:bg-[#008b07] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        disabled={pending}
        on:click={connectOnBoard}>Connect with On Board</button
      >
      <p class="py-4">Or choose the setProvider method:</p>

      <button
        class="block mt-4 px-4 py-2 text-base font-medium text-white bg-[#00ff00] rounded-md shadow-md hover:bg-[#008b07] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        disabled={pending}
        on:click={connect}>Connect with</button
      >

      <select bind:value={type}>
        <option value="Browser">Browser (window.ethereum)</option>
        <option value="Localhost3">Localhost using account index 3</option>
        <option value="Localhost"
          >Localhost (eg ganache or hardhat on http://127.0.0.1:8545)</option
        >
        <option value="Localhost4">Localhost using account index 4</option>
        <option value="LocalhostNull"
          >Localhost but only provider (no signer)</option
        >
        <option value="Infura">ethers.providers.InfuraProvider('goerli')</option
        >
        <option value="Clouflare">ethers.providers.CloudflareProvider()</option>
      </select>
    </div>
    {#if pending}connecting...{/if}
  {:else}
    <p>
      You are now connected to the account {$signerAddress}.
    </p>
    <p>On the network {$chainData.name} (chainId: {$chainId})</p>

    <button class="button" on:click={disconnect}> Disconnect </button>
    <button class="button" on:click={disconnectOnBoard}>
      Disconnect OnBoard</button
    >
  {/if}
</div>

<style>
  select {
    margin-top: 1em;
    padding: 0.5em;
    font-size: 80%;
  }
</style>
