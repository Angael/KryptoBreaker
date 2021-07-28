import React from 'react';

import Cezar from './pages/cezar/Cezar';
import Vigener from './pages/vigener/Vigener';
import Afiniczny from './pages/afiniczny/Afiniczny';
import DiffieHellman from './pages/diffie-hellman/DiffieHellman';
import Odwrotnosc from './pages/odwrotnosc/Odwrotnosc';
import PotegaMod from './pages/potega-mod/PotegaMod';
import RSAKlucze from './pages/rsa/RSAKlucze';
import RSASzyfrowanie from 'pages/rsa/RSASzyfrowanie';
import RSADeszyfrowanie from 'pages/rsa/RSADeszyfrowanie';
import RSAPodpis from './pages/rsa/RSAPodpis';
import RSAPodpisWeryfikacja from './pages/rsa/RSAPodpisWeryfikacja';
import ElGamal from './pages/elgamal/ElGamal';
import Mod from './pages/mod/Mod';

import ElGamalSzyfrowanie from './pages/elgamal/ElGamalSzyfrowanie';
import ElGamalDeszyfrowanie from './pages/elgamal/ElGamalDeszyfrowanie';
import ElGamalPodpis from './pages/elgamal/ElGamalPodpis';
import ElGamalPodpisWeryfikacja from './pages/elgamal/ElGamalPodpisWeryfikacja';
import CheatSheet from './pages/cheat-sheet/CheatSheet';
import Home from 'pages/home/Home';
const Hill = React.lazy(() => import('./pages/hill/Hill'));

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
        categoryName: '',
        methods: [
            {
                component: <Home />,
                name: 'Home',
                keywords: [
                    'home',
                    'about us',
                    'website',
                    'what',
                    'wtf',
                    'explanation',
                    'main',
                    'index',
                ],
            },
        ],
    },
    {
        categoryName: 'Helpers',
        methods: [
            {
                component: <Odwrotnosc />,
                name: 'Modular inverse',
                keywords: ['modulo'],
            },
            {
                component: <PotegaMod />,
                name: 'Modular exponentiation',
                keywords: [g, 'potęga', 'power'],
            },
            { component: <Mod />, name: 'Modulo', keywords: ['modulo'] },
            {
                component: <CheatSheet />,
                name: 'Letters to numbers',
                keywords: [],
            },
        ],
    },
    {
        categoryName: 'Ciphers',
        methods: [
            {
                component: <Cezar />,
                name: 'Cesar',
                keywords: [word, 'klucz', encrDecr],
            },
            {
                component: <Afiniczny />,
                name: 'Affine',
                keywords: [word, 'klucz', encrDecr],
            },
            {
                component: <Vigener />,
                name: 'Vigenère',
                keywords: [word, 'klucz', encrDecr],
            },
            {
                component: <Hill />,
                name: 'Hill',
                keywords: [word, 'klucz - macierz', encrDecr],
            },
        ],
    },
    {
        categoryName: 'Key exchange',
        methods: [
            {
                component: <DiffieHellman />,
                name: 'Diffie Hellman',
                keywords: [g, p, 'a', 'b'],
            },
        ],
    },
    {
        categoryName: 'RSA',
        methods: [
            {
                component: <RSAKlucze />,
                name: 'Keys generation',
                keywords: [p, 'q', 'e'],
            },
            {
                component: <RSASzyfrowanie />,
                name: 'Encryption',
                keywords: [rsaKeys, wiadomość],
            },
            {
                component: <RSADeszyfrowanie />,
                name: 'Decryption',
                keywords: [rsaKeys, 'y - szyfrogram'],
            },
            {
                component: <RSAPodpis />,
                name: 'Signature',
                keywords: ['n', 'e', 'd', skrot],
            },
            {
                component: <RSAPodpisWeryfikacja />,
                name: 'Signature verification',
                keywords: [rsaKeys, skrot, podpis],
            },
        ],
    },
    {
        categoryName: 'El Gamal',
        methods: [
            {
                component: <ElGamal />,
                name: 'Keys generation',
                keywords: [[g, 'α', 'alpha', 'alfa'], p, 't'],
            },
            {
                component: <ElGamalSzyfrowanie />,
                name: 'Encryption',
                keywords: [elGamalKeys, skrot, ['r', 'randomizer']],
            },
            {
                component: <ElGamalDeszyfrowanie />,
                name: 'Decryption',
                keywords: [elGamalKeys, ['y1', 'y'], ['y2', 'y']],
            },
            {
                component: <ElGamalPodpis />,
                name: 'Signature',
                keywords: [elGamalKeys, skrot, ['r', 'randomizer']],
            },
            {
                component: <ElGamalPodpisWeryfikacja />,
                name: 'Signature verification',
                keywords: [elGamalKeys, skrot, ['u', "u'"], ['s', "s'"]],
            },
        ],
    },
];

export let componentListFuzzySearchHayStack = [];

componentList.forEach((category, i) => {
    const modules = category.methods.map((method, j) => {
        return {
            ...method,
            category: category.categoryName,
            fullName: `${category.categoryName} ${method.name}`,
            indexes: [i, j],
        };
    });
    componentListFuzzySearchHayStack.push(...modules);
});

export default componentList;

window.componentList = componentList;
window.componentListFuzzySearchHayStack = componentListFuzzySearchHayStack;
