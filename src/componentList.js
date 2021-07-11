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
				inputs: ['modulo'],
			},
			{
				component: <PotegaMod />,
				name: 'Potęgowanie modularne',
				inputs: [g, 'potęga', 'power'],
			},
			{ component: <Mod />, name: 'Modulo', inputs: ['modulo'] },
			{
				component: <CheatSheet />,
				name: 'Litery na numery',
				inputs: [],
			},
		],
	},
	{
		categoryName: 'Ogólne',
		methods: [
			{
				component: <Cezar />,
				name: 'Cezar',
				inputs: [word, 'klucz', encrDecr],
			},
			{
				component: <Afiniczny />,
				name: 'Afiniczny',
				inputs: [word, 'klucz', encrDecr],
			},
			{
				component: <Vigener />,
				name: 'Vigener',
				inputs: [word, 'klucz', encrDecr],
			},
			{
				component: <Hill />,
				name: 'Hill',
				inputs: [word, 'klucz - macierz', encrDecr],
			},
			{ component: <DiffieHellman />, name: 'Diffie Hellman', inputs: [g, p, 'a', 'b'] },
		],
	},
	{
		categoryName: 'RSA',
		methods: [
			{ component: <RSAKlucze />, name: 'Klucze', inputs: [p, 'q', 'e'] },
			{
				component: <RSASzyfrowanie />,
				name: 'Szyfrowanie',
				inputs: [rsaKeys, wiadomość],
			},
			{
				component: <RSADeszyfrowanie />,
				name: 'Deszyfrowanie',
				inputs: [rsaKeys, 'y - szyfrogram'],
			},
			{ component: <RSAPodpis />, name: 'Podpis', inputs: ['n', 'e', 'd', skrot] },
			{
				component: <RSAPodpisWeryfikacja />,
				name: 'Weryfikacja podpisu',
				inputs: [rsaKeys, skrot, podpis],
			},
		],
	},
	{
		categoryName: 'El Gamal',
		methods: [
			{
				component: <ElGamal />,
				name: 'Klucze',
				inputs: [[g, 'α', 'alpha', 'alfa'], p, 't'],
			},
			{
				component: <ElGamalSzyfrowanie />,
				name: 'Szyfrowanie',
				inputs: [elGamalKeys, skrot, ['r', 'randomizer']],
			},
			{
				component: <ElGamalDeszyfrowanie />,
				name: 'Deszyfrowanie',
				inputs: [elGamalKeys, ['y1', 'y'], ['y2', 'y']],
			},
			{
				component: <ElGamalPodpis />,
				name: 'Podpis',
				inputs: [elGamalKeys, skrot, ['r', 'randomizer']],
			},
			{
				component: <ElGamalPodpisWeryfikacja />,
				name: 'Weryfikacja podpisu',
				inputs: [elGamalKeys, skrot, ['u', "u'"], ['s', "s'"]],
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
