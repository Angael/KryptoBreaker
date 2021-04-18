import { useState } from 'react';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { getLetter, getCode } from 'utils/numHelpers';
import KryptoTable from '../utils/KryptoTable';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import WordAndSolution from 'utils/WordAndSolution';
import SolutionPerChar from './SolutionPerChar';

function Cezar() {
	const [word, setWord] = useState('kryptografia');
	const [key, setKey] = useState(0);
	const [isEncrypt, setIsEncrypt] = useState(true);

	const cezarEncrypt = () => {
		let crypted = '';
		let newKey = parseInt(key * (isEncrypt ? 1 : -1)) || 0;
		for (let c of word) {
		  crypted += getLetter(getCode(c) + newKey);
		}
		return crypted;
	}

	let result = cezarEncrypt();
	
	const changeKey = (event) => setKey(Number(event.target.value));
	const changeIsEncryption = (event) => setIsEncrypt(event.target.value);
	const changeWord = (event) => setWord(event.target.value);

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
						<WordAndSolution startStr={word} endStr={result || ''} />
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
