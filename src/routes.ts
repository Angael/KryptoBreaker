import { type ComponentType, type LazyExoticComponent, lazy } from 'react';
import type { Dict } from '@/i18n';

export interface PageRoute {
	path: string;
	/** Key into the `routes` dictionary. */
	id: keyof Dict['routes'];
	component: LazyExoticComponent<ComponentType>;
}

export interface RouteGroup {
	/** Key into the `groups` dictionary. */
	id: keyof Dict['groups'];
	routes: PageRoute[];
}

const page = (load: () => Promise<{ default: ComponentType }>) => lazy(load);

export const home: PageRoute = { path: '/', id: 'home', component: page(() => import('@/pages/home')) };

export const groups: RouteGroup[] = [
	{
		id: 'helpers',
		routes: [
			{ path: '/inverse', id: 'inverse', component: page(() => import('@/pages/inverse')) },
			{
				path: '/mod-power',
				id: 'modPower',
				component: page(() => import('@/pages/mod-power')),
			},
			{ path: '/modulo', id: 'modulo', component: page(() => import('@/pages/modulo')) },
			{
				path: '/letters-numbers',
				id: 'letters',
				component: page(() => import('@/pages/letters')),
			},
		],
	},
	{
		id: 'ciphers',
		routes: [
			{ path: '/cesar', id: 'caesar', component: page(() => import('@/pages/caesar')) },
			{ path: '/affine', id: 'affine', component: page(() => import('@/pages/affine')) },
			{ path: '/vigenere', id: 'vigenere', component: page(() => import('@/pages/vigenere')) },
			{ path: '/hill', id: 'hill', component: page(() => import('@/pages/hill')) },
		],
	},
	{
		id: 'exchange',
		routes: [
			{
				path: '/diffie-hellman',
				id: 'diffieHellman',
				component: page(() => import('@/pages/diffie-hellman')),
			},
		],
	},
	{
		id: 'rsa',
		routes: [
			{
				path: '/rsa/key-generation',
				id: 'rsaKeys',
				component: page(() => import('@/pages/rsa/keys')),
			},
			{ path: '/rsa/encrypt', id: 'rsaEncrypt', component: page(() => import('@/pages/rsa/encrypt')) },
			{ path: '/rsa/decrypt', id: 'rsaDecrypt', component: page(() => import('@/pages/rsa/decrypt')) },
			{ path: '/rsa/sign', id: 'rsaSign', component: page(() => import('@/pages/rsa/sign')) },
			{
				path: '/rsa/verify-signature',
				id: 'rsaVerify',
				component: page(() => import('@/pages/rsa/verify')),
			},
		],
	},
	{
		id: 'elgamal',
		routes: [
			{
				path: '/el-gamal/key-generation',
				id: 'elgamalKeys',
				component: page(() => import('@/pages/elgamal/keys')),
			},
			{
				path: '/el-gamal/encrypt',
				id: 'elgamalEncrypt',
				component: page(() => import('@/pages/elgamal/encrypt')),
			},
			{
				path: '/el-gamal/decrypt',
				id: 'elgamalDecrypt',
				component: page(() => import('@/pages/elgamal/decrypt')),
			},
			{ path: '/el-gamal/sign', id: 'elgamalSign', component: page(() => import('@/pages/elgamal/sign')) },
			{
				path: '/el-gamal/verify-signature',
				id: 'elgamalVerify',
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
