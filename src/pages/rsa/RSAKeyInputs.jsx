import React from 'react';
import useNumberInput from 'utils/useNumberInput';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import PaperTitle from 'styled/PaperTitle';
import KluczeDisplay from 'pages/rsa/KluczeDisplay';

export const useRsaKeysInputs = () => {
    const [e, setE] = useNumberInput(1001);
    const [d, setD] = useNumberInput(761);
    const [n, setN] = useNumberInput(1739);

    return { e, setE, d, setD, n, setN };
};

function RsaKeyInputs({ e, setE, d, setD, n, setN }) {
    return (
        <PaperTitle title='Enter keys'>
            <Grid container>
                <Grid item xs={12} sm={6} md={4}>
                    <Box p={2}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            label='e'
                            onChange={setE}
                            value={e}
                            type='number'
                            helperText='Pierwsza wartość klucza 1 - publicznego'
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Box p={2}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            label='n'
                            onChange={setN}
                            value={n}
                            type='number'
                            helperText='Druga wartość obu kluczy'
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Box p={2}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            label='d'
                            onChange={setD}
                            value={d}
                            type='number'
                            helperText='Pierwsza wartość klucza 2 - prywatnego'
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} justify={'center'}>
                    <Box p={2} textAlign={'center'}>
                        <KluczeDisplay e={e} n={n} d={d} />
                    </Box>
                </Grid>
            </Grid>
        </PaperTitle>
    );
}

export default RsaKeyInputs;
