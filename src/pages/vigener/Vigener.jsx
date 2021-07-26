import { useState, useMemo } from 'react';
import {
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { getLetter, getCode, mod } from 'utils/numHelpers';
import KryptoTable from 'utils/KryptoTable';
import Grid from '@material-ui/core/Grid';
import WordAndSolution from 'utils/WordAndSolution';
import SolutionPerChar from './SolutionPerChar';
import PaperTitle from 'styled/PaperTitle';

function Vigener() {
    const [word, setWord] = useState('kryptografia');

    const defaultKey = Math.random() < 0.01 ? 'mrvrhkshytqy' : 'wakacje';
    const [key, setKey] = useState(defaultKey);
    const [isEncrypt, setIsEncrypt] = useState(true);

    const vigenerEncrypt = () => {
        const length = key?.length || 0;
        if (length) {
            let crypted = '';
            for (let i in word) {
                const c = word[i];
                const k = key[i % length];
                crypted += getLetter(
                    mod(getCode(c) + getCode(k) * (isEncrypt ? 1 : -1))
                );
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
                    <Grid item xs={12} sm={6} md={4}>
                        <Box p={2}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                label='word'
                                onChange={changeWord}
                                value={word}
                                helperText='Text to be encrypted'
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Box p={2}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                label='key'
                                type='text'
                                onChange={changeKey}
                                value={key}
                                helperText='Text used as key'
                            />
                        </Box>
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
                    middleNumbersArr={middleTableRow}
                    isEncryption={isEncrypt}
                />
            </PaperTitle>
            {key ? (
                <PaperTitle title='Calculation'>
                    {word.split('').map((c, i) => (
                        <SolutionPerChar
                            key={c + i}
                            letter={c}
                            keyValue={key[i % key.length]}
                            isEncryption={isEncrypt}
                        />
                    ))}
                </PaperTitle>
            ) : (
                <PaperTitle title='Calculation' p={2}>
                    Enter key to see calculations...
                </PaperTitle>
            )}
        </>
    );
}

export default Vigener;
