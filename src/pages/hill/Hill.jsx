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
import { css } from '@emotion/css';
import TextField from '@material-ui/core/TextField';
import { getLetter, getCode } from 'utils/numHelpers';
import KryptoTable from 'utils/KryptoTable';
import Grid from '@material-ui/core/Grid';
import WordAndSolution from 'utils/WordAndSolution';
import MatrixInput from './Matrix';
import useMatrixState from 'pages/hill/useMatrixState';
import Slider from '@material-ui/core/Slider';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import {
    getInvertedMatrix,
    modMatrix,
    getZeroesMatrix,
    willKeyWork,
} from './hillCipher';
import PaperTitle from '../../styled/PaperTitle';
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

const getArrayFromMatrix = (matrix) =>
    matrix?.data.map((row) => Array.from(row));

const matrixArrayToString = (rows) =>
    rows?.map((row) => row.map((v) => getLetter(v)).join('')).join('');

const methods = {
    encrypt: 'encrypt',
    decryptWithInverted: 'decrypt-with-inverted',
    decrypt: 'decrypt',
};

const multiplySignCss = css`
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(50%, -50%) scale(0.5);
`;

const equalsSignCss = css`
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(50%, -50%) scale(2.5);
`;

function Hill() {
    const [word, setWord] = useState('telewizor');
    const { rows, setValue, size, resize } = useMatrixState([
        [9, 3, 4],
        [7, 2, 1],
        [6, 5, 8],
        // [25, 24, 17],
        // [14, 24, 3],
        // [5, 19, 5],
    ]);
    const [method, setMethod] = useState(methods.encrypt);

    // Generalnie isEncrypt wskazuje ze po prostu mnozymy dwie macieze
    const isDecryptWithInverted = method === methods.decryptWithInverted;
    const isDecryptWithoutInverted = method === methods.decrypt;
    const isAnyDecrypt = method !== methods.encrypt;
    const isEncrypt = method === methods.encrypt || isDecryptWithInverted;

    const wordMatrix = useMemo(
        () => matrixFromString(word, size),
        [word, size]
    );
    const keyMatrix = useMemo(() => new Matrix(rows), [rows]);

    const isKeyMatrixOk = willKeyWork(keyMatrix);

    const { resultMatrix, resultMatrixBeforeMod } = useMemo(
        () => hillEncrypt(wordMatrix, keyMatrix, isEncrypt),
        [wordMatrix, keyMatrix, isEncrypt]
    );
    const result = matrixArrayToString(getArrayFromMatrix(resultMatrix));

    const changeWord = (event) => setWord(event.target.value);
    const changeMethod = (event) => setMethod(event.target.value);
    const handleResize = (e, v) => resize(v);

    const [showResultAfterMod, setShowResultAfterMod] = useState(true);
    const toggleShowResultAfterMod = () => setShowResultAfterMod((v) => !v);

    const invertedKeyMatrix =
        isDecryptWithoutInverted && getInvertedMatrix(keyMatrix);

    return (
        <>
            <PaperTitle title='Explanation' p={2}>
                <Typography gutterBottom>
                    {/*Enkrypcja Hilla polega na pomnożeniu macierzy słowa przez*/}
                    {/*macierz klucza.*/}
                    Hill encryption: Multiply word matrix by key matrix.
                </Typography>
                <Typography gutterBottom>
                    {/*Dekrypcja Hilla polega na pomnożeniu macierzy słowa przez*/}
                    {/*macierz <b>odwróconego</b> klucza.*/}
                    Hill decryption: Multiply word matrix by <b>inverted</b> key
                    matrix.
                </Typography>
            </PaperTitle>
            <PaperTitle title='Inputs'>
                <Grid container>
                    <Grid item xs={0} sm={3} md={4} />
                    <Grid item xs={12} sm={6} md={4}>
                        <Box p={2}>
                            <FormControl fullWidth>
                                <Select
                                    variant='outlined'
                                    value={method}
                                    onChange={changeMethod}
                                >
                                    <MenuItem value={'encrypt'}>
                                        Encrypt
                                    </MenuItem>
                                    <MenuItem value={'decrypt-with-inverted'}>
                                        Decrypt (I have inverted key)
                                    </MenuItem>
                                    <MenuItem value={'decrypt'}>
                                        Decrypt
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={0} sm={3} md={4} />
                    <Grid item xs={0} md={3} />
                    <Grid item xs={12} md={6}>
                        <Box p={2}>
                            <Typography id='input-slider' gutterBottom>
                                Key Matrix size: {size}x{size}
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
                                max={7}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={0} md={3} />
                    <Grid item xs={12} md={6}>
                        <Box p={2}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                label={isAnyDecrypt ? 'Encrypted word' : 'Word'}
                                onChange={changeWord}
                                value={word}
                            />
                            <Grid item xs={12} align='center'>
                                <MatrixInput
                                    rows={getArrayFromMatrix(wordMatrix)}
                                />
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box p={2}>
                            <TextField
                                label={
                                    isDecryptWithInverted
                                        ? 'Inverted key:'
                                        : 'Key:'
                                }
                                fullWidth
                                variant='outlined'
                                onChange={changeWord}
                                value={rows.flat().join(',')}
                                disabled
                            />
                            <Grid item xs={12} align='center'>
                                <MatrixInput
                                    rows={rows}
                                    changeValue={setValue}
                                    error={!isKeyMatrixOk}
                                    helperText={
                                        !isKeyMatrixOk
                                            ? 'Inverting this matrix twice returns different matrix'
                                            : ''
                                    }
                                />
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </PaperTitle>
            {isDecryptWithoutInverted && (
                <PaperTitle title='Inverted Key' p={2}>
                    <Grid container>
                        <Grid xs={0} md={3} />
                        <Grid xs={12} md={6}>
                            <MatrixInput
                                rows={getArrayFromMatrix(invertedKeyMatrix)}
                            />
                        </Grid>
                        <Grid xs={0} md={3} />
                    </Grid>
                </PaperTitle>
            )}

            <PaperTitle title='Calculation' p={2}>
                <Grid container>
                    <Grid item xs={4} align='center'>
                        <Typography variant='body1'>
                            {isAnyDecrypt ? 'Encrypted word' : 'Word'}:
                        </Typography>
                        <div style={{ position: 'relative' }}>
                            <MatrixInput
                                rows={getArrayFromMatrix(wordMatrix)}
                            />{' '}
                            <FiberManualRecordIcon
                                className={multiplySignCss}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={4} align='center'>
                        <Typography variant='body1'>
                            {isAnyDecrypt ? 'Inverted key' : 'Key'}
                        </Typography>
                        <div style={{ position: 'relative' }}>
                            <MatrixInput
                                rows={
                                    isDecryptWithoutInverted
                                        ? getArrayFromMatrix(invertedKeyMatrix)
                                        : getArrayFromMatrix(keyMatrix)
                                }
                            />
                            <div className={equalsSignCss}>=</div>
                        </div>
                    </Grid>
                    <Grid item xs={4} align='center'>
                        <Typography variant='body1'>
                            {isAnyDecrypt ? 'Word' : 'Encrypted Word'}:
                        </Typography>

                        <MatrixInput
                            rows={getArrayFromMatrix(
                                showResultAfterMod
                                    ? resultMatrix
                                    : resultMatrixBeforeMod
                            )}
                        />
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
                    </Grid>
                </Grid>
            </PaperTitle>
            <PaperTitle title='Solution'>
                <WordAndSolution startStr={word} endStr={result || ''} />
            </PaperTitle>
            <PaperTitle title='Table'>
                <KryptoTable
                    startStr={word}
                    endStr={result}
                    isEncryption={isEncrypt}
                />
            </PaperTitle>
        </>
    );
}

export default Hill;
