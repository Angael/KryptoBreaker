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

const modulo = ['liczba', 'modulo', 'm', 'p', 'n'];

const componentList = [
	{
		categoryName: 'Helpers',
		methods: [
			{
				component: <Odwrotnosc />,
				name: 'Odwrotność multiplikatywna',
				inputs: [...modulo],
			},
			{
				component: <PotegaMod />,
				name: 'Potęgowanie modularne',
				inputs: [...modulo, 'g', 'potęga', 'power'],
			},
			{ component: <Mod />, name: 'Modulo' },
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
			{ component: <Cezar />, name: 'Cezar', inputs: ['cesar', 'klucz', 'key'] },
			{ component: <Afiniczny />, name: 'Afiniczny' },
			{ component: <Vigener />, name: 'Vigener' },
			{ component: <Hill />, name: 'Hill' },
			{ component: <DiffieHellman />, name: 'Diffie Hellman' },
		],
	},
	{
		categoryName: 'RSA',
		methods: [
			{ component: <RSAKlucze />, name: 'Klucze' },
			{ component: <RSASzyfrowanie />, name: 'Szyfrowanie' },
			{ component: <RSADeszyfrowanie />, name: 'Deszyfrowanie' },
			{ component: <RSAPodpis />, name: 'Podpis' },
			{ component: <RSAPodpisWeryfikacja />, name: 'Weryfikacja podpisu' },
		],
	},
	{
		categoryName: 'El Gamal',
		methods: [
			{ component: <ElGamal />, name: 'Klucze' },
			{ component: <ElGamalSzyfrowanie />, name: 'Szyfrowanie' },
			{ component: <ElGamalDeszyfrowanie />, name: 'Deszyfrowanie' },
			{ component: <ElGamalPodpis />, name: 'Podpis' },
			{ component: <ElGamalPodpisWeryfikacja />, name: 'Weryfikacja podpisu' },
		],
	},
];

export let componentListFuzzySearchHayStack = [];

componentList.forEach((category) => {
	const modules = category.methods.map((method) => {
		return { ...method, category: category.categoryName };
	});
	componentListFuzzySearchHayStack.push(...modules);
});

export default componentList;

window.componentList = componentList;
window.componentListFuzzySearchHayStack = componentListFuzzySearchHayStack;
