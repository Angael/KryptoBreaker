import { useMemo } from 'react';
import { Box, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import useNumberInput from 'utils/useNumberInput';
import getFastPowerMod from 'utils/fast-power-table/getFastPowerMod';
import DisplayFormula from 'pages/diffie-hellman/DisplayFormula';
import FastPowerTable from 'utils/fast-power-table/FastPowerTable';
import KluczeDisplay from './KluczeDisplay';
import PaperTitle from 'styled/PaperTitle';

function ElGamal() {
    const [g, setG] = useNumberInput(2);
    const [p, setP] = useNumberInput(1619);
    const [t, setT] = useNumberInput(937);

    const solutionPowA = useMemo(() => getFastPowerMod(g, t, p), [p, g, t]);

    return (
        <>
            <PaperTitle title='Inputs'>
                <Grid container>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box p={2}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                label='g or α'
                                onChange={setG}
                                value={g}
                                type='number'
                                helperText='Generator'
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Box p={2}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                label='p'
                                onChange={setP}
                                value={p}
                                type='number'
                                helperText='Modulo number'
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
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
                </Grid>
            </PaperTitle>
            <PaperTitle title='Equation' p={2}>
                <Box
                    display='flex'
                    alignContent='center'
                    justifyContent='center'
                >
                    <Typography variant={'h4'}>
                        {'β = '}
                        <DisplayFormula
                            number={'α'}
                            modulo={'p'}
                            power={'t'}
                            variant={'h4'}
                        />
                        {' = '}
                        <DisplayFormula
                            number={g}
                            modulo={p}
                            power={t}
                            variant={'h4'}
                        />
                    </Typography>
                </Box>
            </PaperTitle>
            <PaperTitle title='Calculation'>
                <Grid container justify='center'>
                    <Grid item xs={12} sm={8} md={6}>
                        <Box p={2}>
                            <FastPowerTable stepsObj={solutionPowA} />
                        </Box>
                    </Grid>
                </Grid>
            </PaperTitle>

            <KluczeDisplay
                p={p}
                alpha={g}
                beta={solutionPowA.result}
                t={t}
                showPaper
            />
        </>
    );
}

export default ElGamal;
