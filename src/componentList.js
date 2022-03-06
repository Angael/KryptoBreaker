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

const componentList = [
    {
        categoryName: '',
        methods: [
            {
                path: '/',
                component: <Home />,
                name: 'Home',
            },
        ],
    },
    {
        categoryName: 'Helpers',
        methods: [
            {
                path: '/inverse',
                component: <Odwrotnosc />,
                name: 'Modular inverse',
            },
            {
                path: '/mod-power',
                component: <PotegaMod />,
                name: 'Modular exponentiation',
            },
            {
                path: '/modulo',
                component: <Mod />,
                name: 'Modulo',
            },
            {
                path: '/letters-numbers',
                component: <CheatSheet />,
                name: 'Letters to numbers',
            },
        ],
    },
    {
        categoryName: 'Ciphers',
        methods: [
            { path: '/cesar', component: <Cezar />, name: 'Cesar' },
            { path: '/affine', component: <Afiniczny />, name: 'Affine' },
            { path: '/vigenere', component: <Vigener />, name: 'Vigenère' },
            { path: '/hill', component: <Hill />, name: 'Hill' },
        ],
    },
    {
        categoryName: 'Key exchange',
        methods: [
            {
                path: '/diffie-hellman',
                component: <DiffieHellman />,
                name: 'Diffie Hellman',
            },
        ],
    },
    {
        categoryName: 'RSA',
        methods: [
            {
                path: '/rsa/key-generation',
                component: <RSAKlucze />,
                name: 'Keys generation',
            },
            {
                path: '/rsa/encrypt',
                component: <RSASzyfrowanie />,
                name: 'Encryption',
            },
            {
                path: '/rsa/decrypt',
                component: <RSADeszyfrowanie />,
                name: 'Decryption',
            },
            { path: '/rsa/sign', component: <RSAPodpis />, name: 'Signature' },
            {
                path: '/rsa/verify-signature',
                component: <RSAPodpisWeryfikacja />,
                name: 'Signature verification',
            },
        ],
    },
    {
        categoryName: 'El Gamal',
        methods: [
            {
                path: '/el-gamal/key-generation',
                component: <ElGamal />,
                name: 'Keys generation',
            },
            {
                path: '/el-gamal/encrypt',
                component: <ElGamalSzyfrowanie />,
                name: 'Encryption',
            },
            {
                path: '/el-gamal/decrypt',
                component: <ElGamalDeszyfrowanie />,
                name: 'Decryption',
            },
            {
                path: '/el-gamal/sign',
                component: <ElGamalPodpis />,
                name: 'Signature',
            },
            {
                path: '/el-gamal/verify-signature',
                component: <ElGamalPodpisWeryfikacja />,
                name: 'Signature verification',
            },
        ],
    },
];

export default componentList;
