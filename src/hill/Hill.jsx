import { useState, useMemo } from 'react';
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

const hillEncrypt = (wordMatrix, keyMatrix, isEncrypt) => {
	if (isEncrypt) {
		return Matrix.mod(wordMatrix.mmul(keyMatrix), 26);
	} else {
		const invertedKey = keyMatrix.transpose();
		return Matrix.mod(wordMatrix.mmul(invertedKey), 26);
	}
};

const matrixFromString = (word, matrixWidth) => {
	console.log('a', word, matrixWidth);
	const matrixHeight = Math.ceil(word.length / matrixWidth);

	const newMatrix = Matrix.zeros(matrixHeight, matrixWidth);
	const letters = word.split('');
	if (letters) {
		letters.forEach((c, i) => {
			const row = Math.floor(i / matrixWidth);
			const col = i % matrixWidth;
			newMatrix.set(row, col, getCode(c));
		});
		return newMatrix;
	} else {
		return null;
	}
};

const getArrayFromMatrix = (matrix) => matrix.data.map((row) => Array.from(row));

const matrixArrayToString = (rows) =>
	rows.map((row) => row.map((v) => getLetter(v)).join('')).join('');

window.Matrix = Matrix;

function Hill() {
	const [word, setWord] = useState('telewizor');
	const { rows, setValue, size, resize } = useMatrixState(3);
	const [isEncrypt, setIsEncrypt] = useState(true);

	const wordMatrix = useMemo(() => matrixFromString(word, size), [word, size]);
	const keyMatrix = useMemo(() => new Matrix(rows), [rows]);

	const resultMatrix = useMemo(() => hillEncrypt(wordMatrix, keyMatrix, isEncrypt), [
		wordMatrix,
		keyMatrix,
		isEncrypt,
	]);
	const result = matrixArrayToString(getArrayFromMatrix(resultMatrix));
	console.log('test', getArrayFromMatrix(resultMatrix));
	console.log('result', result);

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
