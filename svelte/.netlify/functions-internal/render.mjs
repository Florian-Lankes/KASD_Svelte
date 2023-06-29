import { init } from '../serverless.js';

export const handler = init({
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","images/layers-2x.png","images/layers.png","images/marker-icon-2x.png","images/marker-icon.png","images/marker-shadow.png","leaflet.css"]),
	mimeTypes: {".png":"image/png",".css":"text/css"},
	_: {
		client: {"start":"_app/immutable/entry/start.c69750f3.js","app":"_app/immutable/entry/app.e142ee1b.js","imports":["_app/immutable/entry/start.c69750f3.js","_app/immutable/chunks/index.19c2dee0.js","_app/immutable/chunks/singletons.49da3e68.js","_app/immutable/chunks/index.680d50c2.js","_app/immutable/entry/app.e142ee1b.js","_app/immutable/chunks/index.19c2dee0.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('../server/nodes/0.js'),
			() => import('../server/nodes/1.js'),
			() => import('../server/nodes/2.js'),
			() => import('../server/nodes/3.js'),
			() => import('../server/nodes/4.js'),
			() => import('../server/nodes/5.js'),
			() => import('../server/nodes/6.js'),
			() => import('../server/nodes/7.js'),
			() => import('../server/nodes/8.js'),
			() => import('../server/nodes/9.js'),
			() => import('../server/nodes/10.js'),
			() => import('../server/nodes/11.js'),
			() => import('../server/nodes/12.js'),
			() => import('../server/nodes/13.js'),
			() => import('../server/nodes/14.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/addGroup",
				pattern: /^\/addGroup\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/addPlacemark",
				pattern: /^\/addPlacemark\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/analytics",
				pattern: /^\/analytics\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/dashboard/group/[id]",
				pattern: /^\/dashboard\/group\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/dashboard/placemark/[id]",
				pattern: /^\/dashboard\/placemark\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/imageGallery",
				pattern: /^\/imageGallery\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/logout",
				pattern: /^\/logout\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/map",
				pattern: /^\/map\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/reload",
				pattern: /^\/reload\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/signup",
				pattern: /^\/signup\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
});
