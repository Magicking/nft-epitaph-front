import{S as Q,i as Y,s as z,k as C,l as O,m as x,h,b as E,v as J,d as U,f as L,g as D,E as j,q as k,a as P,r as y,c as $,n as B,C as m,Q as G,u as N,D as R,e as H,y as X,z as F,A as K,B as Z}from"./index.933105c2.js";import{f as ee,j as te,k as ne,g as ae,W as se,d as T,r as oe,a as le}from"./Loading.svelte_svelte_type_style_lang.68899ee6.js";import{i as ce,a as re,b as ie}from"./WalletSetup.svelte_svelte_type_style_lang.48e2b0ef.js";import{L as de}from"./Loading.88455b5c.js";function fe(i){let e,n,a,d,f,u,p,o,r=i[5].name+"",c,v,g,I,l,s,t,_,W;return{c(){e=C("div"),n=C("div"),a=k("You are now connected to the account: "),d=C("p"),f=k(i[4]),u=P(),p=C("p"),o=k("On the network "),c=k(r),v=k(" (chainId: "),g=k(i[6]),I=k(")"),l=P(),s=C("button"),t=k("Disconnect OnBoard"),this.h()},l(w){e=O(w,"DIV",{class:!0});var b=x(e);n=O(b,"DIV",{});var A=x(n);a=y(A,"You are now connected to the account: "),d=O(A,"P",{class:!0});var V=x(d);f=y(V,i[4]),V.forEach(h),A.forEach(h),u=$(b),p=O(b,"P",{});var S=x(p);o=y(S,"On the network "),c=y(S,r),v=y(S," (chainId: "),g=y(S,i[6]),I=y(S,")"),S.forEach(h),l=$(b),s=O(b,"BUTTON",{class:!0});var M=x(s);t=y(M,"Disconnect OnBoard"),M.forEach(h),b.forEach(h),this.h()},h(){B(d,"class","signeraddress svelte-17sea5a"),B(s,"class","button neon-btn yellow"),B(e,"class","flex flex-col h-screen text-white mt-10 w-[70vw] gap-y-2")},m(w,b){E(w,e,b),m(e,n),m(n,a),m(n,d),m(d,f),m(e,u),m(e,p),m(p,o),m(p,c),m(p,v),m(p,g),m(p,I),m(e,l),m(e,s),m(s,t),_||(W=G(s,"click",i[1]),_=!0)},p(w,b){b&16&&N(f,w[4]),b&32&&r!==(r=w[5].name+"")&&N(c,r),b&64&&N(g,w[6])},i:R,o:R,d(w){w&&h(e),_=!1,W()}}}function ue(i){let e,n,a,d,f,u,p,o,r,c,v,g,I,l=i[2]&&q();return{c(){e=C("div"),n=C("p"),a=k("Use an external provider:"),d=P(),f=C("button"),u=k("Connect with On Board"),p=P(),o=C("hr"),r=P(),l&&l.c(),c=H(),this.h()},l(s){e=O(s,"DIV",{class:!0});var t=x(e);n=O(t,"P",{class:!0});var _=x(n);a=y(_,"Use an external provider:"),_.forEach(h),d=$(t),f=O(t,"BUTTON",{class:!0});var W=x(f);u=y(W,"Connect with On Board"),W.forEach(h),t.forEach(h),p=$(s),o=O(s,"HR",{class:!0}),r=$(s),l&&l.l(s),c=H(),this.h()},h(){B(n,"class","wallet_text svelte-17sea5a"),B(f,"class","block px-2 py-1 md:px-4 md:py-2 text-base font-sm md:font-md text-white blue rounded-md neon-btn text-center md:text-start"),f.disabled=i[2],B(e,"class","flex items-center justify-between text-center md:text-start gap-y-2 flex-col md:flex-row lg:flex-row"),B(o,"class","my-10 blue")},m(s,t){E(s,e,t),m(e,n),m(n,a),m(e,d),m(e,f),m(f,u),E(s,p,t),E(s,o,t),E(s,r,t),l&&l.m(s,t),E(s,c,t),v=!0,g||(I=G(f,"click",i[0]),g=!0)},p(s,t){(!v||t&4)&&(f.disabled=s[2]),s[2]?l?t&4&&D(l,1):(l=q(),l.c(),D(l,1),l.m(c.parentNode,c)):l&&(J(),U(l,1,1,()=>{l=null}),L())},i(s){v||(D(l),v=!0)},o(s){U(l),v=!1},d(s){s&&h(e),s&&h(p),s&&h(o),s&&h(r),l&&l.d(s),s&&h(c),g=!1,I()}}}function q(i){let e,n;return e=new de({}),{c(){X(e.$$.fragment)},l(a){F(e.$$.fragment,a)},m(a,d){K(e,a,d),n=!0},i(a){n||(D(e.$$.fragment,a),n=!0)},o(a){U(e.$$.fragment,a),n=!1},d(a){Z(e,a)}}}function pe(i){let e,n,a,d;const f=[ue,fe],u=[];function p(o,r){return o[3]?1:0}return n=p(i),a=u[n]=f[n](i),{c(){e=C("div"),a.c()},l(o){e=O(o,"DIV",{});var r=x(e);a.l(r),r.forEach(h)},m(o,r){E(o,e,r),u[n].m(e,null),d=!0},p(o,[r]){let c=n;n=p(o),n===c?u[n].p(o,r):(J(),U(u[c],1,1,()=>{u[c]=null}),L(),a=u[n],a?a.p(o,r):(a=u[n]=f[n](o),a.c()),D(a,1),a.m(e,null))},i(o){d||(D(a),d=!0)},o(o){U(a),d=!1},d(o){o&&h(e),u[n].d()}}}function me(i,e,n){let a,d,f,u;j(i,ee,t=>n(3,a=t)),j(i,te,t=>n(4,d=t)),j(i,ne,t=>n(5,f=t)),j(i,ae,t=>n(6,u=t));const p=ce(),r=re({projectId:"550b3382ab70a46838a0f1659b4aef43",requiredChains:[1],dappUrl:"https://rge.6120.eu/"});let c=ie({wallets:[p,r],chains:[{id:"0x1",token:"ETH",label:"Ethereum Mainnet",rpcUrl:"https://eth-mainnet.g.alchemy.com/v2/_ufgCCm8U0HQ70u1xxcJwxXBC9fN8ISc"}],appMetadata:{name:"RG EPITAPH",description:"RG Epitaph drawing interface.",recommendedInjectedWallets:[{name:"MetaMask",url:"https://metamask.io"},{name:"WalletConnect",url:"https://walletconnect.com/"}]},accountCenter:{desktop:{enabled:!1,position:"topRight"},mobile:{enabled:!1,position:"topRight"}}});if(c.state.select("wallets").subscribe(t=>{var W;const _=(W=t[0])==null?void 0:W.provider;if(_){const w=new se(_,"any");T.setProvider(w),T.attachContract("rge",oe.address,le.abi)}l()}),typeof window<"u"){const t=JSON.parse(window.sessionStorage.getItem("ConnectedWallets"));t&&t.length>0&&c.connectWallet({autoSelect:{label:t[0],disableModals:!0}}).then(()=>{console.log(t)}).catch(console.error)}const g=async()=>{await c.connectWallet()},I=async()=>{window.sessionStorage.removeItem("ConnectedWallets");const t=c.state.get().wallets[0];await c.disconnectWallet({label:t.label}),await T.disconnect()};function l(){const t=c.state.get().wallets.map(({label:_})=>_);t.length>0&&(console.log(t),window.sessionStorage.setItem("ConnectedWallets",JSON.stringify(t)))}return[g,I,!1,a,d,f,u]}class ve extends Q{constructor(e){super(),Y(this,e,me,pe,z,{connectOnBoard:0,disconnectOnBoard:1})}get connectOnBoard(){return this.$$.ctx[0]}get disconnectOnBoard(){return this.$$.ctx[1]}}export{ve as W};
