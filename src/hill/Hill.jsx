import { useState } from 'react';
import { Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { getLetter, getCode } from 'utils/numHelpers';
import KryptoTable from 'utils/KryptoTable';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import WordAndSolution from 'utils/WordAndSolution';
import LineForLetter from 'utils/line-for-letter/LineForLetter';
import SolutionPerChar from './SolutionPerChar';
import MatrixInput from './Matrix';
import useMatrixState from 'hill/useMatrixState';

import { Matrix } from 'ml-matrix';

const hillEncrypt = (wordMatrix, keyMatrix) => {
	return Matrix.mod(wordMatrix.mmul(keyMatrix), 26);
};

const matrixFromString = (word, matrixWidth) => {
	console.log('a', word, matrixWidth);
	const matrixHeight = Math.ceil(word.length / matrixWidth);

	const newMatrix = Matrix.zeros(matrixHeight, matrixWidth);
	const letters = word.split('');
	if (letters) {
		letters.forEach((c, i) => {
			console.group('letter: ' + c);
			const row = Math.floor(i / matrixWidth);
			console.log('row:', row);
			const col = i % matrixWidth;
			console.log('col:', col);
			newMatrix.set(row, col, getCode(c));
			console.groupEnd('letter: ' + c);
		});
		return newMatrix;
	} else {
		return null;
	}
};

const getArrayFromMatrix = (matrix) => matrix.data.map((row) => Array.from(row));

window.Matrix = Matrix;

function Hill() {
	const [word, setWord] = useState('telewizor');
	const { rows, setValue, size, resize } = useMatrixState(3);
	const [isEncrypt, setIsEncrypt] = useState(true);

	var A = new Matrix([
		[1, 1],
		[2, 2],
	]);
	const wordMatrix = matrixFromString(word, size);
	console.log('matrix from word', wordMatrix);
	let result = 'placeholder'; // useMemo || hillEncrypt();

	const changeWord = (event) => setWord(event.target.value);
	const changeIsEncryption = (event) => setIsEncrypt(event.target.value);
	const handleResize = (e) => resize(e.target.value);

	return (
		<>
			<Box my={4}>
				<Paper elevation={3}>
					<Box p={2}>
						<Grid container>
							<Grid item xs={6}>
								<TextField label='word' onChange={changeWord} value={word} />
							</Grid>
							<Grid item xs={6}>
								<FormControl>
									<InputLabel>Which way</InputLabel>
									<Select value={isEncrypt} onChange={changeIsEncryption}>
										<MenuItem value={true}>Encrypt</MenuItem>
										<MenuItem value={false}>Decrypt</MenuItem>
									</Select>
								</FormControl>
							</Grid>
						</Grid>
					</Box>
					<Box p={2}>
						<Grid container>
							<Grid item xs={6}></Grid>
							<Grid item xs={6}>
								<TextField
									label='Size of key matrix'
									type='number'
									value={size}
									onChange={handleResize}
								/>
							</Grid>
						</Grid>
					</Box>
					<Box p={2}>
						<Grid container>
							<Grid item xs={6}>
								<Typography variant='h4'>Word:</Typography>
								<MatrixInput rows={getArrayFromMatrix(wordMatrix)} />
							</Grid>
							<Grid item xs={6}>
								<Typography variant='h4'>Key:</Typography>
								<MatrixInput rows={rows} changeValue={setValue} />
							</Grid>
						</Grid>
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
						{/* {word.split('').map((c, i) => (
							<SolutionPerChar key={c + i} letter={c} keyValue={key} isEncryption={isEncrypt} />
						))} */}
					</Box>
				</Paper>
			</Box>
		</>
	);
}

export default Hill;
