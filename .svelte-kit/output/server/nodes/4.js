import * as universal from '../entries/pages/epitaph/_page.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/epitaph/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/epitaph/+page.js";
export const imports = ["_app/immutable/nodes/4.32bf8aec.js","_app/immutable/chunks/index.991a8b25.js","_app/immutable/chunks/rge.abi.0fd34cee.js","_app/immutable/chunks/index.2c800dea.js","_app/immutable/chunks/stores.d9321448.js","_app/immutable/chunks/singletons.7727c0cf.js","_app/immutable/chunks/graveyard.71dfe6b9.js","_app/immutable/chunks/Loading.46b71e9a.js"];
export const stylesheets = ["_app/immutable/assets/4.1452be0f.css","_app/immutable/assets/Loading.94bb27be.css"];
export const fonts = [];
