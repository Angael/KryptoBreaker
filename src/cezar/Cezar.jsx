import { useState } from 'react';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { getLetter, getCode } from 'utils/numHelpers';
import KryptoTable from '../utils/KryptoTable';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import WordAndSolution from 'utils/WordAndSolution';
import SolutionPerChar from './SolutionPerChar';

const cezarForLetter = (letter, key) => getLetter(getCode(letter) + key);

const cezarEncrypt = (word, key) => {
	return word
		.split('')
		.map((c) => cezarForLetter(c, key))
		.join('');
};

function Cezar() {
	const [word, setWord] = useState('kryptografia');
	const [key, setKey] = useState(0);
	const [isEncrypt, setIsEncrypt] = useState(true);

	let result = word && key !== undefined ? cezarEncrypt(word, key) : '';
	if (isEncrypt) {
		result = word && key !== undefined ? cezarEncrypt(word, key) : '';
	} else {
		result = word && key !== undefined ? cezarEncrypt(word, -key) : '';
	}

	const changeWord = (event) => setWord(event.target.value);
	const changeKey = (event) => setKey(Number(event.target.value));
	const changeIsEncryption = (e, v) => setIsEncrypt(e.target.value);

	return (
		<>
			<Box my={4}>
				<Paper elevation={3}>
					<Grid container>
						<Grid item xs={6}>
							<Box p={2}>
								<TextField label='word' onChange={changeWord} value={word} />
							</Box>
						</Grid>
						<Grid item xs={6}>
							<Box p={2}>
								<FormControl>
									<InputLabel>Which way</InputLabel>
									<Select value={isEncrypt} onChange={changeIsEncryption}>
										<MenuItem value={true}>Encrypt</MenuItem>
										<MenuItem value={false}>Decrypt</MenuItem>
									</Select>
								</FormControl>
							</Box>
						</Grid>
					</Grid>
					<Box p={2}>
						<TextField label='key' type='number' onChange={changeKey} value={key} />
					</Box>
					<Box p={2}>
						<Typography variant='h4'>Solution:</Typography>
						<WordAndSolution startStr={word} endStr={result} />
					</Box>
					<Box p={2}>
						<Typography variant='h4'>Table:</Typography>
						<KryptoTable startStr={word} endStr={result} isEncryption={isEncrypt} />
					</Box>
					<Box p={2}>
						<Typography variant='h4'>Letter by letter:</Typography>
						{word.split('').map((c) => (
							<SolutionPerChar letter={c} keyValue={key} isEncryption={isEncrypt} />
						))}
					</Box>
				</Paper>
			</Box>
		</>
	);
}

export default Cezar;
