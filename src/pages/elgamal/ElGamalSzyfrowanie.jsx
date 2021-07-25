import { useMemo } from 'react';
import { Box, Typography, useMediaQuery } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import useNumberInput from 'utils/useNumberInput';
import getFastPowerMod from 'utils/fast-power-table/getFastPowerMod';
import DisplayFormula from 'pages/diffie-hellman/DisplayFormula';
import { mod } from 'utils/numHelpers';
import FastPowerTable from 'utils/fast-power-table/FastPowerTable';
import { useTheme } from '@material-ui/core/styles';
import ElGamalKeyInputs, {
    useElgamalKeysInputs,
} from 'pages/elgamal/ElGamalKeyInputs';
import PaperTitle from 'styled/PaperTitle';

function ElGamalSzyfrowanie() {
    const rsaInputs = useElgamalKeysInputs();
    const { p, alpha, t } = rsaInputs;

    const [x, setX] = useNumberInput(20);
    const [r, setR] = useNumberInput(320);

    const solutionPowA = useMemo(
        () => getFastPowerMod(alpha, t, p),
        [p, alpha, t]
    );

    const beta = solutionPowA.result;

    const solutionPowY1 = useMemo(
        () => getFastPowerMod(alpha, r, p),
        [p, alpha, r]
    );
    const solutionPowY2 = useMemo(
        () => getFastPowerMod(beta, r, p),
        [p, beta, r]
    );
    const y1 = solutionPowY1.result;
    const y2 = mod(x * solutionPowY2.result, p);

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
                                label='x'
                                onChange={setX}
                                value={x}
                                type='number'
                                helperText='Message'
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box p={2}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                label='r'
                                onChange={setR}
                                value={r}
                                type='number'
                                helperText='Randomizer'
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
                        C = (y<sub>1</sub>, y<sub>2</sub>) = E
                        <sub>
                            k<sub>1</sub>
                        </sub>
                        (r,x) = (α<sup>r</sup> mod p, x * β<sup>r</sup> mod p)
                    </Typography>
                </Box>
            </PaperTitle>

            <PaperTitle title={'Calculation'}>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Box p={2} align='center'>
                            <Typography variant='h4' gutterBottom>
                                y<sub>1</sub>
                            </Typography>
                            <DisplayFormula
                                number={alpha}
                                power={r}
                                modulo={p}
                            />
                            <FastPowerTable stepsObj={solutionPowY1} />{' '}
                            <Box p={2}>
                                y<sub>1</sub>= {y1}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box p={2} align='center'>
                            <Typography variant='h4' gutterBottom>
                                y<sub>2</sub>
                            </Typography>
                            {x} *{' '}
                            <DisplayFormula
                                number={beta}
                                power={r}
                                modulo={p}
                            />
                            <FastPowerTable stepsObj={solutionPowY2} />
                            <Box p={2}>
                                y<sub>2</sub> = {x} * {solutionPowY2.result} mod{' '}
                                {p} = {y2}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </PaperTitle>

            <PaperTitle title={'Solution'}>
                <Box p={2}>
                    <Typography variant='h4' align='center'>
                        (y<sub>1</sub>, y<sub>2</sub>) = ({y1}, {y2})
                    </Typography>
                </Box>
            </PaperTitle>
        </>
    );
}

export default ElGamalSzyfrowanie;
