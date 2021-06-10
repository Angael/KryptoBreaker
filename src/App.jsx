import { useState } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import Cezar from './cezar/Cezar';
import Vigener from './vigener/Vigener';
import Afiniczny from './afiniczny/Afiniczny';
import Hill from './hill/Hill';
import DiffieHellman from './diffie-hellman/DiffieHellman';
import Odwrotnosc from './odwrotnosc/Odwrotnosc';
import PotegaMod from './potega-mod/PotegaMod';
import RSAKlucze from './rsa-klucze/RSAKlucze';

export const methods = {
	cezar: 'c',
	afiniczny: 'a',
	vigenera: 'v',
	hila: 'h',
	diffieHellman: 'dh',
	odwrotnosc: 'odw',
	potegaMod: 'potMod',
	rsaKlucze: 'rsaKlucze',
};

function App() {
	const [method, setMetod] = useState(methods.diffieHellman);

	const handleChange = (event) => {
		setMetod(event.target.value);
	};

	return (
		<Container maxWidth='md'>
			<Box my={4}>
				<Typography variant='h2'>Kryptobreaker:</Typography>
			</Box>
			<Paper elevation={3}>
				<Box
					p={2}
					display='flex'
					alignContent='center'
					justifyItems='center'
					justifyContent='center'
				>
					<FormControl>
						<InputLabel>Metoda</InputLabel>
						<Select value={method} onChange={handleChange}>
							<MenuItem value={methods.cezar}>Cezara</MenuItem>
							<MenuItem value={methods.afiniczny}>Afiniczny</MenuItem>
							<MenuItem value={methods.vigenera}>Vigenera</MenuItem>
							<MenuItem value={methods.hila}>Hila</MenuItem>
							<MenuItem value={methods.diffieHellman}>Diffie Hellman</MenuItem>
							<MenuItem value={methods.odwrotnosc}>Odwrotność modularna</MenuItem>
							<MenuItem value={methods.potegaMod}>Potęga modułowa</MenuItem>
							<MenuItem value={methods.rsaKlucze}>RSA Klucze</MenuItem>
						</Select>
					</FormControl>
				</Box>
			</Paper>
			<Box m={4} display='flex' alignContent='center' justifyItems='center' justifyContent='center'>
				<ArrowDownwardIcon />
			</Box>
			<Box my={4}>{method === methods.cezar && <Cezar />}</Box>
			<Box my={4}>{method === methods.afiniczny && <Afiniczny />}</Box>
			<Box my={4}>{method === methods.vigenera && <Vigener />}</Box>
			<Box my={4}>{method === methods.hila && <Hill />}</Box>
			<Box my={4}>{method === methods.diffieHellman && <DiffieHellman />}</Box>
			<Box my={4}>{method === methods.odwrotnosc && <Odwrotnosc />}</Box>
			<Box my={4}>{method === methods.potegaMod && <PotegaMod />}</Box>
			<Box my={4}>{method === methods.rsaKlucze && <RSAKlucze />}</Box>
		</Container>
	);
}

export default App;
