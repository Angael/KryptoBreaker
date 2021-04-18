import { useState } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import Cezar from './cezar/Cezar';
import Vigener from './vigener/Vigener';
import Paper from '@material-ui/core/Paper';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

export const methods = {
	cezar: 'c',
	afiniczny: 'a',
	vigenera: 'v',
	hila: 'h',
};

function App() {
	const [method, setMetod] = useState(methods.cezar);

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
						</Select>
					</FormControl>
				</Box>
			</Paper>
			<Box m={4} display='flex' alignContent='center' justifyItems='center' justifyContent='center'>
				<ArrowDownwardIcon />
			</Box>
			<Box my={4}>{method === methods.cezar && <Cezar />}</Box>
			<Box my={4}>{method === methods.vigenera && <Vigener />}</Box>
		</Container>
	);
}

export default App;
