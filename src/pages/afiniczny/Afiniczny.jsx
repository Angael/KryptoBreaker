import { useState } from 'react';

import { Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { getLetter, getCode, modInverse, mod } from 'utils/numHelpers';
import KryptoTable from 'utils/KryptoTable';
import WordAndSolution from 'utils/WordAndSolution';
import SolutionPerChar from './SolutionPerChar';
import AfinicznyKluczLiczenie from './AfinicznyKluczLiczenie';
import useNumberInput from 'pages/diffie-hellman/useNumberInput';

const affineNumber = (number, [a, b], isEncode, p) => {
	let result;
	if (!isEncode) {
		const newA = modInverse(a, p);
		result = newA * (number - b);
	} else {
		result = number * a + b;
	}

	return mod(result, p);
};

const affineString = (str, [a, b], isEncode, p = 26) => {
	let result = '';
	for (let character of str) {
		const code = affineNumber(getCode(character), [a, b], isEncode, p);

		result += getLetter(mod(code, 26));
	}

	return result;
};

function Afiniczny() {
	const [word, setWord] = useState('kryptografia');
	const [number, setNumber] = useNumberInput(25);
	const [p, setP] = useNumberInput(31);
	const [keys, setKeys] = useState('');
	const [isEncrypt, setIsEncrypt] = useState(true);
	const [isWord, setIsWord] = useState(true);

	const [a = 0, b = 0] = keys.replace(/\s/, '').split(',').map(Number);

	let result;
	if (isWord) {
		result =
			word && a !== undefined && b !== undefined ? affineString(word, [a, b], isEncrypt) : '';
	} else {
		result = affineNumber(number, [a, b], isEncrypt, p);
	}

	const changeWord = (event) => setWord(event.target.value);
	const changeKey = (event) => setKeys(event.target.value);
	const changeIsEncryption = (e, v) => setIsEncrypt(e.target.value);
	const changeIsWord = (e, v) => setIsWord(e.target.value);

	return (
		<>
			<Grid container>
				<Grid item xs={6}>
					<Box p={2}>
						{isWord ? (
							<TextField label='Wiadomość' onChange={changeWord} value={word} />
						) : (
							<TextField label='Liczba' onChange={setNumber} value={number} type='number' />
						)}
					</Box>
				</Grid>
				<Grid item xs={6}>
					<Box p={2}>
						<FormControl>
							<InputLabel>Enkrypcja?</InputLabel>
							<Select value={isEncrypt} onChange={changeIsEncryption}>
								<MenuItem value={true}>Enkrypcja</MenuItem>
								<MenuItem value={false}>Dekrypcja</MenuItem>
							</Select>
						</FormControl>
					</Box>
				</Grid>
				<Grid item xs={6}>
					<Box p={2}>
						<TextField
							label='Klucze x,y'
							placeholder={'3,7'}
							type='text'
							onChange={changeKey}
							value={keys}
							helperText='Wymagany format x,y'
						/>
					</Box>
				</Grid>
				<Grid item xs={6}>
					<Box p={2}>
						<FormControl>
							<InputLabel>Word/nr</InputLabel>
							<Select value={isWord} onChange={changeIsWord}>
								<MenuItem value={true}>Word</MenuItem>
								<MenuItem value={false}>Nr</MenuItem>
							</Select>
						</FormControl>
						{!isWord && (
							<Box my={2}>
								<TextField
									label='p'
									helperText={
										<>
											Z<sub>p</sub> = Z<sub>{p}</sub> = Ile jest liczb w szyfrze
										</>
									}
									onChange={setP}
									value={p}
									type='number'
								/>
							</Box>
						)}
					</Box>
				</Grid>
			</Grid>
			{isWord && (
				<Box p={2}>
					<Typography variant='h4'>Rozwiązanie:</Typography>
					<WordAndSolution startStr={word} endStr={result} />
				</Box>
			)}
			{isWord && (
				<Box p={2}>
					<Typography variant='h4'>Table:</Typography>
					<KryptoTable startStr={word} endStr={result} isEncryption={isEncrypt} />
				</Box>
			)}
			{!isEncrypt && (
				<Box p={2}>
					<Typography variant='h4'>Klucz odwrócony:</Typography>
					<AfinicznyKluczLiczenie a={a} n={p} />
				</Box>
			)}

			{isWord ? (
				<Box p={2}>
					<Typography variant='h4'>Letter by letter:</Typography>

					{word.split('').map((c, i) => (
						<SolutionPerChar key={c + i} letter={c} a={a} b={b} isEncryption={isEncrypt} />
					))}
				</Box>
			) : (
				<Box p={2}>
					<Typography variant='h4'>Rozwiązanie:</Typography>
					<SolutionPerChar letter={number} a={a} b={b} isEncryption={isEncrypt} p={p} />
				</Box>
			)}
		</>
	);
}

export default Afiniczny;
