import { useState } from 'react';
import {
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Paper,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { getLetter, getCode } from 'utils/numHelpers';
import KryptoTable from 'utils/KryptoTable';
import Grid from '@material-ui/core/Grid';
import WordAndSolution from 'utils/WordAndSolution';
import SolutionPerChar from './SolutionPerChar';
import PaperTitle from 'styled/PaperTitle';

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
    };

    let result = cezarEncrypt();

    const changeKey = (event) => setKey(Number(event.target.value));
    const changeIsEncryption = (event) => setIsEncrypt(event.target.value);
    const changeWord = (event) => setWord(event.target.value);

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
                                    fullWidth
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
                                variant='outlined'
                                label='Word'
                                onChange={changeWord}
                                value={word}
                                helperText={'Text to be encrypted'}
                                fullWidth
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Box p={2}>
                            <TextField
                                variant='outlined'
                                label='Key'
                                helperText='Value that will be added to every character'
                                type='number'
                                onChange={changeKey}
                                value={key}
                                fullWidth
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
                    isEncryption={isEncrypt}
                />
            </PaperTitle>

            <PaperTitle title='Calculations'>
                {word.split('').map((c, i) => (
                    <SolutionPerChar
                        key={c + i}
                        letter={c}
                        keyValue={key}
                        isEncryption={isEncrypt}
                    />
                ))}
            </PaperTitle>
        </>
    );
}

export default Cezar;
