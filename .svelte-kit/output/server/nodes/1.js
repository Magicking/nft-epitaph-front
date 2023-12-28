

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.74eaad34.js","_app/immutable/chunks/index.991a8b25.js","_app/immutable/chunks/stores.d9321448.js","_app/immutable/chunks/singletons.7727c0cf.js","_app/immutable/chunks/index.2c800dea.js"];
export const stylesheets = [];
export const fonts = [];
