import { useMemo } from 'react';
import { Typography, Box, Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { mod, modInverse } from 'utils/numHelpers';

import useNumberInput from 'utils/useNumberInput';
import getFastPowerMod from 'utils/fast-power-table/getFastPowerMod';
import DisplayFormula from 'pages/diffie-hellman/DisplayFormula';
import FastPowerTable from 'utils/fast-power-table/FastPowerTable';
import KluczeDisplay from './KluczeDisplay';
import OdwrotnoscTable from 'pages/odwrotnosc/OdwrotnoscTable';
import ElGamalKeyInputs, {
    useElgamalKeysInputs,
} from 'pages/elgamal/ElGamalKeyInputs';
import PaperTitle from 'styled/PaperTitle';

function ElGamalPodpis() {
    const rsaInputs = useElgamalKeysInputs();
    const { p, alpha, t } = rsaInputs;

    const [h, setH] = useNumberInput(357);
    const [r, setR] = useNumberInput(515);

    const inverted = modInverse(r, p - 1);
    const solutionPowA = useMemo(
        () => getFastPowerMod(alpha, r, p),
        [p, alpha, r]
    );

    const u = solutionPowA.result;
    const s = mod(inverted * (h - t * u), p - 1);

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
                                label='h'
                                onChange={setH}
                                value={h}
                                type='number'
                                helperText='Message hash'
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
            {/*<Box p={2}>*/}
            {/*    Alicja chce wysłać do Boba wiadomość, której*/}
            {/*    skrót wynosi h={h}. Wygenerować przez Alicję*/}
            {/*    podpis cyfrowy ElGamala dla tej wiadomości,*/}
            {/*    wiedząc, że Alicja użyła randomizera r={r}.*/}
            {/*</Box>*/}{' '}
            <PaperTitle title={'Equation'}>
                <Grid container justify={'center'}>
                    <Grid item xs={12} align='center'>
                        <Box p={2} pb={2} textAlign='center'>
                            <Typography variant={'h4'}>
                                Signature = (u, s)
                            </Typography>
                            <Typography variant='h4'>
                                u ={' '}
                                <DisplayFormula
                                    number={'α'}
                                    modulo={'p'}
                                    power={'r'}
                                    variant={'h4'}
                                />
                            </Typography>
                            <Typography variant={'h4'}>
                                s = r<sup>-1</sup> * (h - t * u) mod (p -1)
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </PaperTitle>
            <PaperTitle title={'Calculate "u"'}>
                <Grid container justify={'center'}>
                    <Grid item xs={12} sm={8} md={6} align='center'>
                        <Box p={2} pb={2} textAlign='center'>
                            <DisplayFormula
                                number={alpha}
                                modulo={p}
                                power={r}
                                variant={'h4'}
                            />
                        </Box>
                        <FastPowerTable stepsObj={solutionPowA} />
                        <Box p={2} textAlign='center'>
                            u = {solutionPowA.result}
                        </Box>
                    </Grid>
                </Grid>
            </PaperTitle>
            <PaperTitle title={'Calculate "s"'}>
                <Box py={2} align='center'>
                    <OdwrotnoscTable a={r} b={p - 1} />
                    <Box p={2}>
                        <Typography>
                            s = ({inverted} * ({h} - {t} * {solutionPowA.result}
                            )) mod {p - 1} = {s}
                        </Typography>
                        <Typography>s = {s}</Typography>
                    </Box>
                </Box>
            </PaperTitle>
            <PaperTitle title={'Solution'}>
                <Box p={2} align='center'>
                    <Typography variant='body1' component='p'>
                        Signature (u, s) = ({u}, {s})
                    </Typography>
                </Box>
            </PaperTitle>
        </>
    );
}
export default ElGamalPodpis;
