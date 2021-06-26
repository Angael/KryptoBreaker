import Cezar from './cezar/Cezar';
import Vigener from './vigener/Vigener';
import Afiniczny from './afiniczny/Afiniczny';
import Hill from './hill/Hill';
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

const componentList = [
	{
		categoryName: 'Helpers',
		methods: [
			{ component: <Odwrotnosc />, name: 'Odwrotność multiplikatywna' },
			{ component: <PotegaMod />, name: 'Potęgowanie modularne' },
			{ component: <Mod />, name: 'Modulo' },
			{ component: <CheatSheet />, name: 'Litery na numery' },
		],
	},
	{
		categoryName: 'Ogólne',
		methods: [
			{ component: <Cezar />, name: 'Cezar' },
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

export default componentList;
