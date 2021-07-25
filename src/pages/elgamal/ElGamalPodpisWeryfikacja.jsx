import { useMemo } from 'react';
import { Typography, Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { mod } from 'utils/numHelpers';

import useNumberInput from 'utils/useNumberInput';
import getFastPowerMod from 'utils/fast-power-table/getFastPowerMod';
import DisplayFormula from 'pages/diffie-hellman/DisplayFormula';
import FastPowerTable from 'utils/fast-power-table/FastPowerTable';
import KluczeDisplay from './KluczeDisplay';
import ElGamalKeyInputs, {
    useElgamalKeysInputs,
} from 'pages/elgamal/ElGamalKeyInputs';
import PaperTitle from 'styled/PaperTitle';

function ElGamalPodpisWeryfikacja() {
    const rsaInputs = useElgamalKeysInputs();
    const { p, alpha, beta, t } = rsaInputs;

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

    const f = solutionPowF.result;
    const g = mod(solutionPowLeft.result * solutionPowRight.result, p);

    return (
        <>
            <ElGamalKeyInputs {...rsaInputs} />

            <PaperTitle title='Inputs'>
                <Grid container>
                    {/*<Grid item xs={12}>*/}
                    {/*    <Box p={2}>*/}
                    {/*        Bob otrzymał od Alicji wiadomość, której skrót*/}
                    {/*        wynosi h={h}, oraz podpis cyfrowy ELGamala (u, s) =*/}
                    {/*        ({u}, {s}). Zweryfikuj przez Boba otrzymany od*/}
                    {/*        Alicji podpis cyfrowy.*/}
                    {/*    </Box>*/}
                    {/*</Grid>*/}
                    <Grid item xs={3}>
                        <Box p={2}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                label="h'"
                                onChange={setH}
                                value={h}
                                type='number'
                                helperText='Message hash'
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box p={2}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                label="u'"
                                onChange={setU}
                                value={u}
                                type='number'
                                helperText={`First signature's value`}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box p={2}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                label="s'"
                                onChange={setS}
                                value={s}
                                type='number'
                                helperText={`Second signature's value`}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </PaperTitle>

            <PaperTitle title={'Equations'} p={2}>
                <Typography variant='h4' align='center'>
                    f ={' '}
                    <DisplayFormula
                        number={'α'}
                        power={'h'}
                        modulo={'p'}
                        variant={'h4'}
                    />
                </Typography>
                <Typography variant='h4' align='center'>
                    g = β<sup>u'</sup> * u'<sup>s'</sup> mod p ={' '}
                    <DisplayFormula
                        number={'β'}
                        power={"u'"}
                        modulo={'p'}
                        variant={'h4'}
                    />{' '}
                    {'* '}
                    <DisplayFormula
                        number={"u'"}
                        power={"s'"}
                        modulo={'p'}
                        variant={'h4'}
                    />
                </Typography>
                <Typography variant='h4' align='center'>
                    If signature is correct then f = g
                </Typography>
            </PaperTitle>

            <PaperTitle title={'Calculate "f"'}>
                <Grid container justify={'center'}>
                    <Grid item xs={12} sm={8} md={6} align='center'>
                        <Box p={2} pb={2} textAlign='center'>
                            <DisplayFormula
                                number={alpha}
                                power={h}
                                modulo={p}
                                variant={'h5'}
                            />
                            <FastPowerTable stepsObj={solutionPowF} />
                            <Box p={2} textAlign='center'>
                                f = {solutionPowF.result}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </PaperTitle>

            <PaperTitle title={'Calculate "g"'}>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Box p={2} align='center'>
                            <Typography gutterBottom>
                                <DisplayFormula
                                    number={'β'}
                                    power={"u'"}
                                    modulo={'p'}
                                    variant={'h5'}
                                />
                            </Typography>
                            <Typography gutterBottom>
                                <DisplayFormula
                                    number={beta}
                                    power={u}
                                    modulo={p}
                                    variant={'h5'}
                                />
                            </Typography>
                            <FastPowerTable stepsObj={solutionPowLeft} />
                            <Box p={2}>{solutionPowLeft.result}</Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box p={2} align='center'>
                            <Typography gutterBottom>
                                <DisplayFormula
                                    number={"u'"}
                                    power={"s'"}
                                    modulo={'p'}
                                    variant={'h5'}
                                />
                            </Typography>
                            <Typography gutterBottom>
                                <DisplayFormula
                                    number={u}
                                    power={s}
                                    modulo={p}
                                    variant={'h5'}
                                />
                            </Typography>
                            <FastPowerTable stepsObj={solutionPowRight} />
                            <Box p={2}>{solutionPowRight.result}</Box>
                        </Box>
                    </Grid>
                </Grid>
                <Box p={2} align='center'>
                    <Typography gutterBottom>
                        g = ({solutionPowLeft.result} *{' '}
                        {solutionPowRight.result}) mod {p} ={' '}
                        {solutionPowLeft.result * solutionPowRight.result} mod{' '}
                        {p}
                    </Typography>
                    <Typography gutterBottom>g = {g}</Typography>
                </Box>
            </PaperTitle>

            <PaperTitle title={'Solution'}>
                <Box align={'center'} p={2}>
                    <Typography variant='body1' component='p'>
                        f {f == g ? '=' : '≠'} g
                    </Typography>
                    <Typography variant='body1' component='p'>
                        {g} {f == g ? '=' : '≠'} {f}
                    </Typography>
                    <Typography variant='body1' component='p'>
                        <b>Signature {f == g ? 'is' : "isn't"} correct</b>
                    </Typography>
                </Box>
            </PaperTitle>
        </>
    );
}
export default ElGamalPodpisWeryfikacja;
