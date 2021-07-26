import { useMemo } from 'react';
import { Typography, Box, useMediaQuery } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import useNumberInput from 'utils/useNumberInput';
import getFastPowerMod from 'utils/fast-power-table/getFastPowerMod';
import KluczeDisplay from './KluczeDisplay';
import DisplayFormula from 'pages/diffie-hellman/DisplayFormula';
import { mod } from 'utils/numHelpers';
import FastPowerTable from 'utils/fast-power-table/FastPowerTable';
import { useTheme } from '@material-ui/core/styles';
import ElGamalKeyInputs, {
    useElgamalKeysInputs,
} from 'pages/elgamal/ElGamalKeyInputs';
import PaperTitle from 'styled/PaperTitle';

function ElGamalDeszyfrowanie() {
    const rsaInputs = useElgamalKeysInputs();
    const { p, alpha, t } = rsaInputs;

    const [y1, setY1] = useNumberInput(130);
    const [y2, setY2] = useNumberInput(414);

    const solutionPowA = useMemo(
        () => getFastPowerMod(alpha, t, p),
        [p, alpha, t]
    );

    const beta = solutionPowA.result;

    const power = p - 1 - t;
    const error = power <= 0 || power % 1 !== 0;
    const solutionPowX = useMemo(
        () => getFastPowerMod(y1, power, p),
        [p, y1, power]
    );

    const x = mod(y2 * solutionPowX.result, p);

    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <ElGamalKeyInputs {...rsaInputs} />

            <PaperTitle title='Inputs'>
                <Grid container>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box p={2}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                label={
                                    <>
                                        y<sub>1</sub>
                                    </>
                                }
                                onChange={setY1}
                                value={y1}
                                type='number'
                                helperText='Encrypted message'
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box p={2}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                label={
                                    <>
                                        y<sub>2</sub>
                                    </>
                                }
                                onChange={setY2}
                                value={y2}
                                type='number'
                                helperText='Encrypted message'
                            />
                        </Box>
                    </Grid>
                </Grid>
            </PaperTitle>

            <PaperTitle title={'Equation'}>
                <Box m={2}>
                    <Typography
                        variant={isPhone ? 'body1' : 'h4'}
                        align='center'
                    >
                        X = P = y<sub>2</sub>* y<sub>1</sub>
                        <sup>p - 1 - t</sup> mod p
                    </Typography>
                </Box>
                <Box m={2}>
                    <Typography
                        variant={isPhone ? 'body1' : 'h4'}
                        align='center'
                    >
                        X = P = {y2} * {y1}
                        <sup>{p - 1 - t}</sup> mod {p}
                    </Typography>
                </Box>
            </PaperTitle>

            <PaperTitle title={'Calculation'}>
                <Grid container justify={'center'}>
                    <Grid item xs={12} sm={8} md={6} align='center'>
                        <Box py={2} align='center'>
                            {y2} *{' '}
                            <DisplayFormula
                                number={y1}
                                modulo={p}
                                power={power}
                            />
                            <FastPowerTable stepsObj={solutionPowX} />{' '}
                            <Box p={2}>
                                x = {y2} * {solutionPowX.result} mod {p} = {x}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </PaperTitle>

            <PaperTitle title={'Solution'} p={2}>
                <Typography variant='h4' align='center'>
                    X = {x}
                </Typography>
            </PaperTitle>
        </>
    );
}

export default ElGamalDeszyfrowanie;
