

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/connect/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.635ce63a.js","_app/immutable/chunks/index.991a8b25.js","_app/immutable/chunks/WalletSetup.ce7b3536.js","_app/immutable/chunks/rge.abi.0fd34cee.js","_app/immutable/chunks/index.2c800dea.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/Loading.46b71e9a.js"];
export const stylesheets = ["_app/immutable/assets/WalletSetup.38a21e69.css","_app/immutable/assets/Loading.94bb27be.css"];
export const fonts = [];
