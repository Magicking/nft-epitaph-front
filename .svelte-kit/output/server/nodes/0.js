import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.18090874.js","_app/immutable/chunks/index.991a8b25.js","_app/immutable/chunks/stores.d9321448.js","_app/immutable/chunks/singletons.7727c0cf.js","_app/immutable/chunks/index.2c800dea.js","_app/immutable/chunks/i18n.51c911f7.js"];
export const stylesheets = ["_app/immutable/assets/0.a94507af.css"];
export const fonts = [];
