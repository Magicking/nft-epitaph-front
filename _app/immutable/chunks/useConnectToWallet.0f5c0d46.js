import{i as r,a as i,b as c}from"./WalletSetup.svelte_svelte_type_style_lang.48e2b0ef.js";import{W as d,d as o,r as p,a as m}from"./Loading.svelte_svelte_type_style_lang.68899ee6.js";const b=r(),f={projectId:"550b3382ab70a46838a0f1659b4aef43",requiredChains:[1],dappUrl:"https://rge.6120.eu/"},u=i(f),a=c({wallets:[b,u],chains:[{id:"0x1",token:"ETH",label:"Ethereum Mainnet",rpcUrl:"https://eth.llamarpc.com"}],appMetadata:{name:"NFT EPITAPH",description:"Research tokens smarter and faster.",recommendedInjectedWallets:[{name:"MetaMask",url:"https://metamask.io"},{name:"WalletConnect",url:"https://walletconnect.com/"}]},accountCenter:{desktop:{enabled:!1,position:"topRight"},mobile:{enabled:!1,position:"topRight"}}});function h(){const t=a.state.get().wallets.map(({label:e})=>e);t.length>0&&window.sessionStorage.setItem("ConnectedWallets",JSON.stringify(t))}function C(){if(a.state.select("wallets").subscribe(e=>{var s;const n=(s=e[0])==null?void 0:s.provider;if(n){const l=new d(n,"any");o.setProvider(l),o.attachContract("rge",p.address,m.abi)}h()}),typeof window<"u"){const e=JSON.parse(window.sessionStorage.getItem("ConnectedWallets"));e&&e.length>0&&a.connectWallet({autoSelect:{label:e[0],disableModals:!0}}).then(()=>{console.log(e)}).catch(console.error)}}export{C as u};
