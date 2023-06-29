import * as server from '../entries/pages/imageGallery/_page.server.ts.js';

export const index = 9;
export const component = async () => (await import('../entries/pages/imageGallery/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/imageGallery/+page.server.ts";
export const imports = ["_app/immutable/nodes/9.c84a4e4c.js","_app/immutable/chunks/index.19c2dee0.js","_app/immutable/chunks/Header.686df4fc.js","_app/immutable/chunks/MainNavigator.c4c6b41e.js","_app/immutable/chunks/DisplayImages.5b3cf184.js","_app/immutable/chunks/KASD-Maps-service.3d535409.js","_app/immutable/chunks/stores.02d70664.js","_app/immutable/chunks/index.680d50c2.js","_app/immutable/chunks/navigation.2276e2cd.js","_app/immutable/chunks/singletons.49da3e68.js"];
export const stylesheets = [];
export const fonts = [];
