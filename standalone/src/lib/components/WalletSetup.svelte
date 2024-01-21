<script>
  import { ethers } from "ethers";

  import {
    connected,
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
  import Loading from "./shared/Loading.svelte";

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
  let isOpen = false;
  let selectedOption = "";

  function selectOption(option) {
    selectedOption = option.label;
    type = option.value;
    isOpen = false;
  }

  let onboard = Onboard({
    wallets: [injected, walletConnect],
    chains: [
      {
        id: "0x1",
        token: "ETH",
        label: "Ethereum Mainnet",
        rpcUrl: "https://eth-mainnet.g.alchemy.com/v2/_ufgCCm8U0HQ70u1xxcJwxXBC9fN8ISc",
      },
    ],
    appMetadata: {
      name: "RG EPITAPH",
      description: "RG Epitaph drawing interface.",
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
        .then(() => {
          console.log(alreadyConnectedWallets);
        })
        .catch(console.error);
    }
  }

  export const connectOnBoard = async () => {
    const wallets = await onboard.connectWallet();
  };
  export const disconnectOnBoard = async () => {
    window.sessionStorage.removeItem("ConnectedWallets")
    const connectedWallet = onboard.state.get().wallets[0];
    await onboard.disconnectWallet({ label: connectedWallet.label });
    await evm.disconnect();
  };
  function updateAlreadyConnectedWallets() {
    const connectedWalletsLabels = onboard.state
      .get()
      .wallets.map(({ label }) => label);

    if (connectedWalletsLabels.length > 0) {
      console.log(connectedWalletsLabels);
      window.sessionStorage.setItem(
        "ConnectedWallets",
        JSON.stringify(connectedWalletsLabels)
      );
    } 
  }

  let type;
  let pending = false;

  const connect = async () => {
    pending = true;
    try {
      const handler = {
        Congress: () => evm.setProvider("https://rge.6120.eu/anvilrpc", 6),
        Localhost: () => evm.setProvider("http://127.0.0.1:8545"),
        Browser: () => evm.setProvider(),
        Localhost3: () => evm.setProvider("http://127.0.0.1:8545", 3),
        Localhost4: () => evm.setProvider("http://127.0.0.1:8545", 4),
        LocalhostNull: () => evm.setProvider("http://127.0.0.1:8545", null),
        Gnosis: () => evm.setProvider("https://rpc.gnosischain.com"),
        Arbitrum: () => evm.setProvider("https://arb1.arbitrum.io/rpc"),
      };

      if (type === undefined || !handler[type]) {
	    	type = "Congress";
	    }
      await handler[type]();
      pending = false;
    } catch (e) {
      console.log(e);
      pending = false;
    }
  };

  const options = [
    { label: "37c3 Anvil Mainnet Fork", value: "Congress" },
    { label: "37c3 Anvil Mainnet Fork - HTTP NO CORS", value: "CongressHTTP" },
    { label: "Browser (window.ethereum)", value: "Browser" },
    { label: "Localhost using account index 3", value: "Localhost3" },
    {
      label: "Localhost: (eg ganache or hardhat on http://127.0.0.1:8545)",
      value: "Localhost",
    },
    // Add any other options you need here
  ];


  const disconnect = async () => {
    await evm.disconnect();
    window.sessionStorage.removeItem("ConnectedWallets");
    pending = false;
  };

  // Might come in handy later
  // $: network = $connected ? $provider.getNetwork() : "";
  // $: account = $connected && $signer ? $signer.getAddress() : "";
</script>

    <div>
      {#if !$connected}
          <div
            class="flex items-center justify-between text-center md:text-start gap-y-2 flex-col md:flex-row lg:flex-row"
          >
            <p class="wallet_text">Use an external provider:</p>

            <button
              class="block px-2 py-1 md:px-4 md:py-2 text-base font-sm md:font-md text-white blue rounded-md neon-btn text-center md:text-start"
              disabled={pending}
              on:click={connectOnBoard}>Connect with On Board</button
            >
          </div>
          <hr class="my-10 blue" />
	  <!--
          <div
            class="flex items-center justify-between text-center md:text-start gap-y-2 flex-col md:flex-row lg:flex-row"
          >
            <p class="py-4 wallet_text">Or choose the "setProvider" method:</p>

            <button
              class="block px-4 py-2 text-base font-medium text-white blue rounded-md neon-btn"
              disabled={pending}
              on:click={connect}>Connect with</button
            >
          </div>
		-->
	  <!--
          <div class="mt-4">
            <div class="parent-container">
              <button
                on:click={() => (isOpen = !isOpen)}
                class="bg-white text truncate-select"
              >
                {selectedOption || "Select a provider"}
              </button>

              {#if isOpen}
                <ul class="options">
                  {#each options as option}
                    [!-- svelte-ignore a11y-click-events-have-key-events --]
                    <li class="option" on:click={() => selectOption(option)}>
                      {option.label}
                    </li>
                  {/each}
                </ul>
              {/if}
            </div>
        </div>
		-->
        {#if pending}<Loading />{/if}
      {:else}
        <div class="flex flex-col h-screen text-white mt-10 w-[70vw] gap-y-2">
          <div>
            You are now connected to the account: <p class="signeraddress">
              {$signerAddress}
            </p>
          </div>
          <p>On the network {$chainData.name} (chainId: {$chainId})</p>

<!--
          <button class="button neon-btn red" on:click={disconnect}>
            Disconnect
          </button>
-->
          <button class="button neon-btn yellow" on:click={disconnectOnBoard}>
            Disconnect OnBoard</button
          >
        </div>
      {/if}
    </div>

<style>
  .signeraddress {
    word-wrap: break-word;
    color: #4cc9f0;
  }
  .wallet_text {
    color: #00ff00;
  }
</style>
