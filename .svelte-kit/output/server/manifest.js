export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","robots.txt"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain"},
	_: {
		client: {"start":"_app/immutable/entry/start.bfb8d66f.js","app":"_app/immutable/entry/app.0dd5ffb3.js","imports":["_app/immutable/entry/start.bfb8d66f.js","_app/immutable/chunks/index.991a8b25.js","_app/immutable/chunks/singletons.7727c0cf.js","_app/immutable/chunks/index.2c800dea.js","_app/immutable/entry/app.0dd5ffb3.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.991a8b25.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
