import { useState } from 'react';

import {
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { getLetter, getCode, modInverse, mod } from 'utils/numHelpers';
import KryptoTable from 'utils/KryptoTable';
import WordAndSolution from 'utils/WordAndSolution';
import SolutionPerChar from './SolutionPerChar';
import AfinicznyKluczLiczenie from './AfinicznyKluczLiczenie';
import useNumberInput from 'utils/useNumberInput';
import PaperTitle from '../../styled/PaperTitle';

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
    const [keys, setKeys] = useState('3,7');
    const [isEncrypt, setIsEncrypt] = useState(true);
    const [isWord, setIsWord] = useState(true);

    const [a = NaN, b = NaN] = keys.replace(/\s/, '').split(',').map(Number);
    const keyErr = isNaN(a) || isNaN(b) ? 'Enter keys! Format: x,y' : '';

    let result;
    if (isWord) {
        result =
            word && a !== undefined && b !== undefined
                ? affineString(word, [a, b], isEncrypt)
                : '';
    } else {
        result = affineNumber(number, [a, b], isEncrypt, p);
    }

    const changeWord = (event) => setWord(event.target.value);
    const changeKey = (event) => setKeys(event.target.value);
    const changeIsEncryption = (e, v) => setIsEncrypt(e.target.value);
    const changeIsWord = (e, v) => setIsWord(e.target.value);

    return (
        <>
            <PaperTitle title='Inputs'>
                <Grid container>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box p={2}>
                            <FormControl fullWidth>
                                <Select
                                    variant='outlined'
                                    value={isEncrypt}
                                    onChange={changeIsEncryption}
                                >
                                    <MenuItem value={true}>Encrypt</MenuItem>
                                    <MenuItem value={false}>Decrypt</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>

                    <Grid item xs={0} sm={6} md={8}></Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Box p={2}>
                            {isWord ? (
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    label='Word'
                                    onChange={changeWord}
                                    value={word}
                                    helperText='Text to be encrypted'
                                />
                            ) : (
                                <TextField
                                    fullWidth
                                    variant='outlined'
                                    label='Number'
                                    helperText='Number to be encrypted'
                                    onChange={setNumber}
                                    value={number}
                                    type='number'
                                />
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box p={2}>
                            <FormControl>
                                <Select
                                    variant='outlined'
                                    value={isWord}
                                    onChange={changeIsWord}
                                >
                                    <MenuItem value={true}>Word</MenuItem>
                                    <MenuItem value={false}>Number</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={0} sm={0} md={4}></Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box p={2}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                label='Keys'
                                placeholder={'3,7'}
                                type='text'
                                onChange={changeKey}
                                value={keys}
                                error={!!keyErr}
                                helperText={keyErr || `Format x,y = ${a},${b}`}
                            />
                        </Box>
                    </Grid>
                    {!isWord && (
                        <Grid item xs={12} sm={6} md={4}>
                            <Box p={2}>
                                <TextField
                                    variant='outlined'
                                    label='p'
                                    helperText={
                                        <>
                                            Z<sub>p</sub> = Z<sub>{p}</sub>
                                        </>
                                    }
                                    onChange={setP}
                                    value={p}
                                    type='number'
                                />
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </PaperTitle>

            {isWord ? (
                <PaperTitle title='Solution'>
                    <WordAndSolution startStr={word} endStr={result} />
                </PaperTitle>
            ) : (
                <PaperTitle title='Solution'>
                    <WordAndSolution startStr={number} endStr={result} />
                </PaperTitle>
            )}

            {isWord && (
                <PaperTitle title='Table'>
                    <KryptoTable
                        startStr={word}
                        endStr={result}
                        isEncryption={isEncrypt}
                    />
                </PaperTitle>
            )}
            {!isEncrypt && (
                <PaperTitle title='Inverted Key' p={2}>
                    <AfinicznyKluczLiczenie a={a} n={isWord ? 26 : p} />
                </PaperTitle>
            )}

            {isWord ? (
                <PaperTitle title='Calculation'>
                    {word.split('').map((c, i) => (
                        <SolutionPerChar
                            key={c + i}
                            letter={c}
                            a={a}
                            b={b}
                            isEncryption={isEncrypt}
                        />
                    ))}
                </PaperTitle>
            ) : (
                <PaperTitle title='Calculation'>
                    <SolutionPerChar
                        letter={number}
                        a={a}
                        b={b}
                        isEncryption={isEncrypt}
                        p={p}
                    />
                </PaperTitle>
            )}
        </>
    );
}

export default Afiniczny;
