import { useState } from 'react';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { getLetter, getCode } from 'utils/numHelpers';
import KryptoTable from './KryptoTable';
import Paper from '@material-ui/core/Paper';

const cezarEncrypt = (word, key) => {
	return word
		.split('')
		.map((c) => getLetter(getCode(c) + key))
		.join('');
};

function Cezar() {
	const [word, setWord] = useState('kryptografia');
	const [key, setKey] = useState(0);

	const result = word && key !== undefined ? cezarEncrypt(word, key) : '';
	console.log('result', result);
	const changeWord = (event) => {
		setWord(event.target.value);
	};

	const changeKey = (event) => {
		setKey(Number(event.target.value));
	};

	return (
		<>
			<Box my={4}>
				<Paper elevation={3}>
					<Box p={2}>
						<TextField label='word' onChange={changeWord} value={word} />
					</Box>
					<Box p={2}>
						<TextField label='key' type='number' onChange={changeKey} value={key} />
					</Box>
				</Paper>
				<Box my={4}>{result}</Box>
				<Box my={4}>
					<Typography variant='h4'>Rozwiązanie:</Typography>
				</Box>
				<Box my={4}>
					<KryptoTable publicStr={word || ''} encryptedStr={result || ''} />
				</Box>
			</Box>
		</>
	);
}

export default Cezar;
