import { useState, useMemo } from 'react';
import {
	Typography,
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Switch,
	FormControlLabel,
} from '@material-ui/core';
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
import Slider from '@material-ui/core/Slider';

import { getInvertedMatrix, modMatrix, getZeroesMatrix, isKeyMatrixInvertable } from './hillCipher';
var Matrix = require('node-matrices');

const hillEncrypt = (wordMatrix, keyMatrix, isEncrypt) => {
	if (
		!wordMatrix.numRows() ||
		!wordMatrix.numColumns() ||
		!keyMatrix.numRows() ||
		!keyMatrix.numColumns()
	) {
		return wordMatrix;
	}

	let result;
	if (isEncrypt) {
		result = wordMatrix.multiply(keyMatrix);
	} else {
		const invertedKey = getInvertedMatrix(keyMatrix);
		result = wordMatrix.multiply(invertedKey);
	}
	return {
		resultMatrixBeforeMod: JSON.parse(JSON.stringify(result)),
		resultMatrix: modMatrix(result, 26),
	};
};

const matrixFromString = (word, matrixWidth) => {
	const matrixHeight = Math.ceil(word.length / matrixWidth);

	let newMatrix = getZeroesMatrix(matrixWidth, matrixHeight);
	const letters = word.split('');
	if (letters) {
		letters.forEach((c, i) => {
			const row = Math.floor(i / matrixWidth);
			const col = i % matrixWidth;
			newMatrix = newMatrix.replace(row, col, getCode(c));
		});
		return newMatrix;
	} else {
		return null;
	}
};

const getArrayFromMatrix = (matrix) => matrix?.data.map((row) => Array.from(row));

const matrixArrayToString = (rows) =>
	rows?.map((row) => row.map((v) => getLetter(v)).join('')).join('');

function Hill() {
	const [word, setWord] = useState('telewizor');
	const { rows, setValue, size, resize } = useMatrixState(3);
	const [isEncrypt, setIsEncrypt] = useState(true);

	const wordMatrix = useMemo(() => matrixFromString(word, size), [word, size]);
	const keyMatrix = useMemo(() => new Matrix(rows), [rows]);

	const isKeyMatrixOk = isKeyMatrixInvertable(keyMatrix);

	const { resultMatrix, resultMatrixBeforeMod } = useMemo(
		() => hillEncrypt(wordMatrix, keyMatrix, isEncrypt),
		[wordMatrix, keyMatrix, isEncrypt]
	);
	const result = matrixArrayToString(getArrayFromMatrix(resultMatrix));

	const changeWord = (event) => setWord(event.target.value);
	const changeIsEncryption = (event) => setIsEncrypt(event.target.value);
	const handleResize = (e, v) => resize(v);

	const [showResultAfterMod, setShowResultAfterMod] = useState(true);
	const toggleShowResultAfterMod = () => setShowResultAfterMod((v) => !v);

	return (
		<>
			<Box my={4}>
				<Paper elevation={3}>
					<Box p={2}>
						<Typography>
							Enkrypcja Hilla polega na pomnożeniu macierzy słowa przez macierz klucza.
						</Typography>
						<Typography>
							Dekrypcja Hilla polega na pomnożeniu macierzy słowa przez macierz <b>odwróconego</b>{' '}
							klucza.
						</Typography>
						<Typography gutterBottom>
							Jeśli masz zrobić dekrypcje, i posiadasz <b>odwrócony</b> klucz to ustaw na enkrypcję
						</Typography>
					</Box>
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
								<Typography id='input-slider' gutterBottom>
									Matrix size
								</Typography>
								<Slider
									value={size}
									onChange={handleResize}
									getAriaValueText={(text) => text}
									aria-labelledby='discrete-slider'
									valueLabelDisplay='auto'
									step={1}
									marks
									min={2}
									max={9}
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
								<MatrixInput
									rows={rows}
									changeValue={setValue}
									error={!isKeyMatrixOk}
									helperText={!isKeyMatrixOk ? 'This key matrix can not be inverted' : ''}
								/>
							</Grid>
							{!isEncrypt && (
								<>
									<Grid item xs={6}></Grid>
									<Grid item xs={6}>
										<Typography variant='h4'>Inverted Key:</Typography>
										<MatrixInput rows={getArrayFromMatrix(getInvertedMatrix(keyMatrix))} />
									</Grid>
								</>
							)}
						</Grid>
						<Grid container>
							<Grid item xs={6}>
								<Grid item xs={6}></Grid>
								<Typography variant='h4'>Multiplication result:</Typography>
								<FormControlLabel
									control={
										<Switch
											checked={showResultAfterMod}
											onClick={toggleShowResultAfterMod}
											color='primary'
										/>
									}
									label='After modulo'
								/>
								<MatrixInput
									rows={getArrayFromMatrix(
										showResultAfterMod ? resultMatrix : resultMatrixBeforeMod
									)}
								/>
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
					{/* <Box p={2}>
						<Typography variant='h4'>Letter by letter:</Typography>
						{word.split('').map((c, i) => (
							<SolutionPerChar key={c + i} letter={c} keyValue={key} isEncryption={isEncrypt} />
						))} 
					</Box> */}
				</Paper>
			</Box>
		</>
	);
}

export default Hill;
