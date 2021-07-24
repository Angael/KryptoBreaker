import React, { useMemo } from 'react';
import useNumberInput from 'utils/useNumberInput';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import PaperTitle from 'styled/PaperTitle';
import KluczeDisplay from 'pages/elgamal/KluczeDisplay';
import getFastPowerMod from 'utils/fast-power-table/getFastPowerMod';

export const useElgamalKeysInputs = () => {
    const [p, setP] = useNumberInput(1619);
    const [alpha, setAlpha] = useNumberInput(2);
    const [t, setT] = useNumberInput(937);

    const solutionPowA = useMemo(
        () => getFastPowerMod(alpha, t, p),
        [p, alpha, t]
    );

    const beta = solutionPowA.result;

    return { p, setP, alpha, setAlpha, t, setT, beta };
};

function ElGamalKeyInputs({ p, setP, alpha, setAlpha, t, setT, beta }) {
    return (
        <PaperTitle title='Enter keys'>
            <Grid container>
                <Grid item xs={12} sm={6} md={3}>
                    <Box p={2}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            label='p'
                            onChange={setP}
                            value={p}
                            helperText='Modulo'
                            type='number'
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Box p={2}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            label='α'
                            onChange={setAlpha}
                            value={alpha}
                            type='number'
                            helperText='Generator'
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Box p={2}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            label='β'
                            value={beta}
                            disabled
                            type='number'
                            helperText='Calculated number'
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Box p={2}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            label='t'
                            onChange={setT}
                            value={t}
                            type='number'
                            helperText='Random private variable'
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} justify={'center'}>
                    <Box p={2} textAlign={'center'}>
                        <KluczeDisplay p={p} alpha={alpha} beta={beta} t={t} />
                    </Box>
                </Grid>
            </Grid>
        </PaperTitle>
    );
}

export default ElGamalKeyInputs;
