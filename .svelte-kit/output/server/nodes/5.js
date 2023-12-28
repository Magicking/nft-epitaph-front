

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/mint/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.d951a742.js","_app/immutable/chunks/index.991a8b25.js","_app/immutable/chunks/rge.abi.0fd34cee.js","_app/immutable/chunks/index.2c800dea.js"];
export const stylesheets = ["_app/immutable/assets/5.d4b8f2b9.css"];
export const fonts = [];
