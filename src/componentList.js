import React from 'react';

import Cezar from './cezar/Cezar';
import Vigener from './vigener/Vigener';
import Afiniczny from './afiniczny/Afiniczny';
import DiffieHellman from './diffie-hellman/DiffieHellman';
import Odwrotnosc from './odwrotnosc/Odwrotnosc';
import PotegaMod from './potega-mod/PotegaMod';
import RSAKlucze from './rsa/RSAKlucze';
import RSASzyfrowanie from 'rsa/RSASzyfrowanie';
import RSADeszyfrowanie from 'rsa/RSADeszyfrowanie';
import RSAPodpis from './rsa/RSAPodpis';
import RSAPodpisWeryfikacja from './rsa/RSAPodpisWeryfikacja';
import ElGamal from './elgamal/ElGamal';
import Mod from './mod/Mod';

import ElGamalSzyfrowanie from './elgamal/ElGamalSzyfrowanie';
import ElGamalDeszyfrowanie from './elgamal/ElGamalDeszyfrowanie';
import ElGamalPodpis from './elgamal/ElGamalPodpis';
import ElGamalPodpisWeryfikacja from './elgamal/ElGamalPodpisWeryfikacja';
import CheatSheet from './cheat-sheet/CheatSheet';
const Hill = React.lazy(() => import('./hill/Hill'));

const g = ['g', 'generator'];
const p = ['p', 'grupa multiplikatywna'];
const word = ['słowo', 'wiadomość'];
const encrDecr = [
	['enkrypcja', 'dekrypcja'],
	['szyfrowanie', 'deszyfrowanie'],
];
const wiadomość = ['x', 'wiadomość'];
const skrot = ['x', 'h', 'wiadomość', 'skrót'];
const podpis = ['s', 'podpis'];

const alfa = [g, 'α', 'alpha', 'alfa'];
const beta = ['b', 'β', 'beta'];
const rsaKeys = ['n', 'e', 'd'];
const elGamalKeys = [alfa, p, beta, 't'];

const componentList = [
	{
		categoryName: 'Helpers',
		methods: [
			{
				component: <Odwrotnosc />,
				name: 'Odwrotność multiplikatywna',
				keywords: ['modulo'],
			},
			{
				component: <PotegaMod />,
				name: 'Potęgowanie modularne',
				keywords: [g, 'potęga', 'power'],
			},
			{ component: <Mod />, name: 'Modulo', keywords: ['modulo'] },
			{
				component: <CheatSheet />,
				name: 'Litery na numery',
				keywords: [],
			},
		],
	},
	{
		categoryName: 'Ogólne',
		methods: [
			{
				component: <Cezar />,
				name: 'Cezar',
				keywords: [word, 'klucz', encrDecr],
			},
			{
				component: <Afiniczny />,
				name: 'Afiniczny',
				keywords: [word, 'klucz', encrDecr],
			},
			{
				component: <Vigener />,
				name: 'Vigener',
				keywords: [word, 'klucz', encrDecr],
			},
			{
				component: <Hill />,
				name: 'Hill',
				keywords: [word, 'klucz - macierz', encrDecr],
			},
			{ component: <DiffieHellman />, name: 'Diffie Hellman', keywords: [g, p, 'a', 'b'] },
		],
	},
	{
		categoryName: 'RSA',
		methods: [
			{ component: <RSAKlucze />, name: 'Klucze', keywords: [p, 'q', 'e'] },
			{
				component: <RSASzyfrowanie />,
				name: 'Szyfrowanie',
				keywords: [rsaKeys, wiadomość],
			},
			{
				component: <RSADeszyfrowanie />,
				name: 'Deszyfrowanie',
				keywords: [rsaKeys, 'y - szyfrogram'],
			},
			{ component: <RSAPodpis />, name: 'Podpis', keywords: ['n', 'e', 'd', skrot] },
			{
				component: <RSAPodpisWeryfikacja />,
				name: 'Weryfikacja podpisu',
				keywords: [rsaKeys, skrot, podpis],
			},
		],
	},
	{
		categoryName: 'El Gamal',
		methods: [
			{
				component: <ElGamal />,
				name: 'Klucze',
				keywords: [[g, 'α', 'alpha', 'alfa'], p, 't'],
			},
			{
				component: <ElGamalSzyfrowanie />,
				name: 'Szyfrowanie',
				keywords: [elGamalKeys, skrot, ['r', 'randomizer']],
			},
			{
				component: <ElGamalDeszyfrowanie />,
				name: 'Deszyfrowanie',
				keywords: [elGamalKeys, ['y1', 'y'], ['y2', 'y']],
			},
			{
				component: <ElGamalPodpis />,
				name: 'Podpis',
				keywords: [elGamalKeys, skrot, ['r', 'randomizer']],
			},
			{
				component: <ElGamalPodpisWeryfikacja />,
				name: 'Weryfikacja podpisu',
				keywords: [elGamalKeys, skrot, ['u', "u'"], ['s', "s'"]],
			},
		],
	},
];

export let componentListFuzzySearchHayStack = [];

componentList.forEach((category, i) => {
	const modules = category.methods.map((method, j) => {
		return { ...method, category: category.categoryName, indexes: [i, j] };
	});
	componentListFuzzySearchHayStack.push(...modules);
});

export default componentList;

window.componentList = componentList;
window.componentListFuzzySearchHayStack = componentListFuzzySearchHayStack;
