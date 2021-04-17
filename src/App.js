import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Container from '@material-ui/core/Container';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import Cezar from './cezar/Cezar';

const methods = {
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
				<Typography variant='h2'>Wybierz metode:</Typography>
			</Box>
			<FormControl>
				<InputLabel>Metoda</InputLabel>
				<Select value={method} onChange={handleChange}>
					<MenuItem value={methods.cezar}>Cezara</MenuItem>
					<MenuItem value={methods.afiniczny}>Afiniczny</MenuItem>
					<MenuItem value={methods.vigenera}>Vigenera</MenuItem>
					<MenuItem value={methods.hila}>Hila</MenuItem>
				</Select>
			</FormControl>
			<Box my={4}>{method === methods.cezar && <Cezar />}</Box>
		</Container>
	);
}

export default App;
