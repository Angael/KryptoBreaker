import { useState } from 'react';

import { Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { getLetter, getCode, modInverse } from 'utils/numHelpers';
import KryptoTable from '../utils/KryptoTable';
import WordAndSolution from 'utils/WordAndSolution';
import SolutionPerChar from './SolutionPerChar';
import { mod } from 'utils/numHelpers';

const affine = (word, [a, b], isEncode = true) => {
	let result = '';
	let code = null;

	for (let c of word) {
		if (!isEncode) {
			const newA = modInverse(a, 26);
			console.log({ newA });
			code = newA * (getCode(c) - b);
		} else code = getCode(c) * a + b;

		console.log({ code, mod: mod(code, 26) });
		result += getLetter(mod(code, 26));
	}

	return result;
};

function Afiniczny() {
	const [word, setWord] = useState('kryptografia');
	const [keys, setKeys] = useState('');
	const [isEncrypt, setIsEncrypt] = useState(true);

	const [a = 0, b = 0] = keys.replace(/\s/, '').split(',').map(Number);

	const result = word && a !== undefined && b !== undefined ? affine(word, [a, b], isEncrypt) : '';

	const changeWord = (event) => setWord(event.target.value);
	const changeKey = (event) => setKeys(event.target.value);
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
						<TextField
							label='keys'
							placeholder={'3,7'}
							type='text'
							onChange={changeKey}
							value={keys}
						/>
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
						{/* {word.split('').map((c) => (
							<SolutionPerChar letter={c} keyValue={key} isEncryption={isEncrypt} />
						))} */}
					</Box>
				</Paper>
			</Box>
		</>
	);
}

export default Afiniczny;
