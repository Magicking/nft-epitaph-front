// useConnectToWallet.js
import { ethers } from 'ethers';
import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';
import { defaultEvmStores as evm } from 'svelte-ethers-store';
import rgeConf from '$lib/rge.conf.json';
import rgeAbi from '$lib/rge.abi.json';

const injected = injectedModule();
const wcV2InitOptions = {
    projectId: "550b3382ab70a46838a0f1659b4aef43",
    requiredChains: [1],
    dappUrl: "https://rge.6120.eu/",
};
const walletConnect = walletConnectModule(wcV2InitOptions);

const onboard = Onboard({
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
        desktop: { enabled: false, position: "topRight" },
        mobile: { enabled: false, position: "topRight" },
    },
});

function updateAlreadyConnectedWallets() {
    const connectedWalletsLabels = onboard.state.get().wallets.map(({ label }) => label);
    if (connectedWalletsLabels.length > 0) {
        window.sessionStorage.setItem(
            "ConnectedWallets",
            JSON.stringify(connectedWalletsLabels)
        );
    }
}

export async function connectOnBoard() {
    const wallets = await onboard.connectWallet();
}

async function disconnectOnBoard() {
    const connectedWallet = onboard.state.get().wallets[0];
    await onboard.disconnectWallet({ label: connectedWallet.label });
    await evm.disconnect();
}

export function useConnectToWallet() {
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
}
