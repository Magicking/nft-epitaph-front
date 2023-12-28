import * as universal from '../entries/pages/_page.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.js";
export const imports = ["_app/immutable/nodes/2.a147f22c.js","_app/immutable/chunks/index.991a8b25.js","_app/immutable/chunks/rge.abi.0fd34cee.js","_app/immutable/chunks/index.2c800dea.js","_app/immutable/chunks/i18n.51c911f7.js","_app/immutable/chunks/WalletSetup.ce7b3536.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/Loading.46b71e9a.js","_app/immutable/chunks/graveyard.71dfe6b9.js"];
export const stylesheets = ["_app/immutable/assets/2.4b4e794c.css","_app/immutable/assets/WalletSetup.38a21e69.css","_app/immutable/assets/Loading.94bb27be.css"];
export const fonts = [];
