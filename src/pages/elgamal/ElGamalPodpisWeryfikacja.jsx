import { useMemo } from 'react';
import { Typography, Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { mod } from 'utils/numHelpers';

import useNumberInput from 'pages/diffie-hellman/useNumberInput';
import getFastPowerMod from 'utils/fast-power-table/getFastPowerMod';
import DisplayFormula from 'pages/diffie-hellman/DisplayFormula';
import FastPowerTable from 'utils/fast-power-table/FastPowerTable';
import KluczeDisplay from './KluczeDisplay';

function ElGamalPodpisWeryfikacja() {
    const [p, setP] = useNumberInput(1619);
    const [alpha, setAlpha] = useNumberInput(2);
    const [beta, setBeta] = useNumberInput(1454);
    const [t, setT] = useNumberInput(937);
    const [h, setH] = useNumberInput(357);

    const [u, setU] = useNumberInput(1310);
    const [s, setS] = useNumberInput(1579);

    const solutionPowF = useMemo(
        () => getFastPowerMod(alpha, h, p),
        [p, alpha, h]
    );
    const solutionPowLeft = useMemo(
        () => getFastPowerMod(beta, u, p),
        [p, beta, u]
    );
    const solutionPowRight = useMemo(() => getFastPowerMod(u, s, p), [p, u, s]);

    const g = solutionPowF.result;
    const f = mod(solutionPowLeft.result * solutionPowRight.result, p);

    return (
        <>
            <Grid container>
                <Box>
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid item xs={12}>
                                <KluczeDisplay
                                    p={p}
                                    g={alpha}
                                    beta={beta}
                                    t={t}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={3}>
                            <Box p={2}>
                                <TextField
                                    label='α'
                                    onChange={setAlpha}
                                    value={alpha}
                                    type='number'
                                    helperText='Generator'
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box p={2}>
                                <TextField
                                    label='p'
                                    onChange={setP}
                                    value={p}
                                    type='number'
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box p={2}>
                                <TextField
                                    label='β'
                                    disabled
                                    value={beta}
                                    type='number'
                                    helperText='Wygenerowana liczba'
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box p={2}>
                                <TextField
                                    label='t'
                                    onChange={setT}
                                    value={t}
                                    type='number'
                                    helperText='Wylosowana wartość pierwsza'
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box p={2}>
                                Bob otrzymał od Alicji wiadomość, której skrót
                                wynosi h={h}, oraz podpis cyfrowy ELGamala (u,
                                s) = ({u}, {s}). Zweryfikuj przez Boba otrzymany
                                od Alicji podpis cyfrowy.
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box p={2}>
                                <TextField
                                    label="h'"
                                    onChange={setH}
                                    value={h}
                                    type='number'
                                    helperText='skrót wiadomości'
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box p={2}>
                                <TextField
                                    label="u'"
                                    onChange={setU}
                                    value={u}
                                    type='number'
                                    helperText='pierwsza wartość z podpisu'
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Box p={2}>
                                <TextField
                                    label="s'"
                                    onChange={setS}
                                    value={s}
                                    type='number'
                                    helperText='druga wartość z podpisu'
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Box p={2} pb={2} textAlign='center'>
                        <Grid item xs={12} justify='center'>
                            <Box p={2} align='center'>
                                <Typography variant='h3'>
                                    Weryfikacja podpisu:
                                </Typography>
                                <Typography variant='body1' component='p'>
                                    f ={' '}
                                    <DisplayFormula
                                        number={'α'}
                                        power={'h'}
                                        modulo={'p'}
                                        variant={'body1'}
                                    />{' '}
                                    = {solutionPowF.result}
                                </Typography>
                                <DisplayFormula
                                    number={alpha}
                                    power={h}
                                    modulo={p}
                                    variant={'h5'}
                                />
                            </Box>
                        </Grid>
                    </Box>
                    <Grid container justify='center'>
                        <Grid item xs={12} sm={8} md={6}>
                            <FastPowerTable stepsObj={solutionPowF} />
                        </Grid>
                    </Grid>

                    <Box p={2} align='center'>
                        <Typography variant='body1' component='p'>
                            <b>
                                wzór: (a * b) mod c = (a mod c * b mod c) mod c
                            </b>
                        </Typography>

                        <Typography variant='body1' component='p'>
                            g = β<sup>u'</sup> * u'<sup>s'</sup> mod p = 
                            <DisplayFormula
                                number={'β'}
                                power={"u'"}
                                modulo={'p'}
                                variant={'body1'}
                            />{' '}
                            * 
                            <DisplayFormula
                                number={"u'"}
                                power={"s'"}
                                modulo={'p'}
                                variant={'body1'}
                            />
                        </Typography>
                    </Box>

                    <Box p={2} align='center'>
                        <Grid container justify='center' spacing={2}>
                            <Grid item xs={6}>
                                <FastPowerTable stepsObj={solutionPowLeft} />
                            </Grid>
                            <Grid item xs={6}>
                                <FastPowerTable stepsObj={solutionPowRight} />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box p={2} align='center'>
                        <Typography variant='body1' component='p'>
                            g =  ({solutionPowLeft.result} *{' '}
                            {solutionPowRight.result}) mod {p} = 
                            {solutionPowLeft.result *
                                solutionPowRight.result}{' '}
                            mod {p} {g == f ? '=' : '≠'} {f}
                        </Typography>
                        <Typography variant='body1' component='p'>
                            f {g == f ? '=' : '≠'} g
                        </Typography>
                        <Typography variant='body1' component='p'>
                            {f} {g == f ? '=' : '≠'} {g}
                        </Typography>
                        <Typography variant='body1' component='p'>
                            <b>Podpis {g == f ? 'jest' : 'nie jest'} zgodny</b>
                        </Typography>
                    </Box>
                </Box>
            </Grid>
        </>
    );
}
export default ElGamalPodpisWeryfikacja;
