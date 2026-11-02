import { type ComponentType, type LazyExoticComponent, lazy } from 'react';

export interface PageRoute {
	path: string;
	name: string;
	component: LazyExoticComponent<ComponentType>;
}

export interface RouteGroup {
	name: string;
	routes: PageRoute[];
}

const page = (load: () => Promise<{ default: ComponentType }>) => lazy(load);

export const home: PageRoute = { path: '/', name: 'Home', component: page(() => import('@/pages/home')) };

export const groups: RouteGroup[] = [
	{
		name: 'Helpers',
		routes: [
			{ path: '/inverse', name: 'Modular inverse', component: page(() => import('@/pages/inverse')) },
			{
				path: '/mod-power',
				name: 'Modular exponentiation',
				component: page(() => import('@/pages/mod-power')),
			},
			{ path: '/modulo', name: 'Modulo', component: page(() => import('@/pages/modulo')) },
			{
				path: '/letters-numbers',
				name: 'Letters to numbers',
				component: page(() => import('@/pages/letters')),
			},
		],
	},
	{
		name: 'Ciphers',
		routes: [
			{ path: '/cesar', name: 'Caesar', component: page(() => import('@/pages/caesar')) },
			{ path: '/affine', name: 'Affine', component: page(() => import('@/pages/affine')) },
			{ path: '/vigenere', name: 'Vigenère', component: page(() => import('@/pages/vigenere')) },
			{ path: '/hill', name: 'Hill', component: page(() => import('@/pages/hill')) },
		],
	},
	{
		name: 'Key exchange',
		routes: [
			{
				path: '/diffie-hellman',
				name: 'Diffie–Hellman',
				component: page(() => import('@/pages/diffie-hellman')),
			},
		],
	},
	{
		name: 'RSA',
		routes: [
			{
				path: '/rsa/key-generation',
				name: 'Key generation',
				component: page(() => import('@/pages/rsa/keys')),
			},
			{ path: '/rsa/encrypt', name: 'Encryption', component: page(() => import('@/pages/rsa/encrypt')) },
			{ path: '/rsa/decrypt', name: 'Decryption', component: page(() => import('@/pages/rsa/decrypt')) },
			{ path: '/rsa/sign', name: 'Signature', component: page(() => import('@/pages/rsa/sign')) },
			{
				path: '/rsa/verify-signature',
				name: 'Signature verification',
				component: page(() => import('@/pages/rsa/verify')),
			},
		],
	},
	{
		name: 'ElGamal',
		routes: [
			{
				path: '/el-gamal/key-generation',
				name: 'Key generation',
				component: page(() => import('@/pages/elgamal/keys')),
			},
			{
				path: '/el-gamal/encrypt',
				name: 'Encryption',
				component: page(() => import('@/pages/elgamal/encrypt')),
			},
			{
				path: '/el-gamal/decrypt',
				name: 'Decryption',
				component: page(() => import('@/pages/elgamal/decrypt')),
			},
			{ path: '/el-gamal/sign', name: 'Signature', component: page(() => import('@/pages/elgamal/sign')) },
			{
				path: '/el-gamal/verify-signature',
				name: 'Signature verification',
				component: page(() => import('@/pages/elgamal/verify')),
			},
		],
	},
];

export const allRoutes: PageRoute[] = [home, ...groups.flatMap((g) => g.routes)];

export function findRoute(pathname: string): { group?: RouteGroup; route?: PageRoute } {
	if (pathname === '/') return { route: home };
	for (const group of groups) {
		const route = group.routes.find((r) => r.path === pathname);
		if (route) return { group, route };
	}
	return {};
}
