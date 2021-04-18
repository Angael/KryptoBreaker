import { useState, useMemo } from 'react';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { getLetter, getCode, mod } from 'utils/numHelpers';
import KryptoTable from '../utils/KryptoTable';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import WordAndSolution from 'utils/WordAndSolution';
import SolutionPerChar from './SolutionPerChar';

function Vigener() {
	const [word, setWord] = useState('kryptografia');
	const [key, setKey] = useState('');
	const [isEncrypt, setIsEncrypt] = useState(true);

	const vigenerEncrypt = () => {
		const length = key?.length || 0;
		if (length) {
			let crypted = '';
			for (let i in word) {
				const c = word[i];
				const k = key[i % length];
				crypted += getLetter(mod(getCode(c) + getCode(k) * (isEncrypt ? 1 : -1)));
			}
			return crypted;
		} else return word;
	};

	let result = vigenerEncrypt();

	const changeKey = (event) => setKey(event.target.value);
	const changeIsEncryption = (event) => setIsEncrypt(event.target.value);
	const changeWord = (event) => setWord(event.target.value);

	const middleTableRow = useMemo(() => {
		if (word && key) {
			const arr = [];
			word.split('').forEach((v, i) => arr.push(key[i % key.length]));
			return arr.map((v) => getCode(v));
		} else {
			return null;
		}
	}, [word, key]);

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
						<TextField label='key' type='text' onChange={changeKey} value={key} />
					</Box>
					<Box p={2}>
						<Typography variant='h4'>Solution:</Typography>
						<WordAndSolution startStr={word} endStr={result || ''} />
					</Box>
					<Box p={2}>
						<Typography variant='h4'>Table:</Typography>
						<KryptoTable
							startStr={word}
							endStr={result}
							middleNumbersArr={middleTableRow}
							isEncryption={isEncrypt}
						/>
					</Box>
					{key && (
						<Box p={2}>
							<Typography variant='h4'>Letter by letter:</Typography>
							{word.split('').map((c, i) => (
								<SolutionPerChar
									key={c + i}
									letter={c}
									keyValue={key[i % key.length]}
									isEncryption={isEncrypt}
								/>
							))}
						</Box>
					)}
				</Paper>
			</Box>
		</>
	);
}

export default Vigener;
