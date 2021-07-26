import { useMemo } from 'react';
import { Typography, Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import useNumberInput from 'utils/useNumberInput';
import getFastPowerMod from 'utils/fast-power-table/getFastPowerMod';
import DisplayFormula from 'pages/diffie-hellman/DisplayFormula';
import FastPowerTable from 'utils/fast-power-table/FastPowerTable';
import KluczeDisplay from './KluczeDisplay';
import RsaKeyInputs, { useRsaKeysInputs } from 'pages/rsa/RSAKeyInputs';
import PaperTitle from 'styled/PaperTitle';
import BigText from 'utils/BigText';

function RSAPodpisWeryfikacja() {
    //Wiadomość x
    const [x, setX] = useNumberInput(357);
    const [s, setS] = useNumberInput(1630);

    const rsaInputs = useRsaKeysInputs();
    const { e, d, n } = rsaInputs;

    // x^n mod e
    const solutionPow = useMemo(() => getFastPowerMod(s, e, n), [n, s, e]);

    return (
        <>
            <RsaKeyInputs {...rsaInputs} />

            <PaperTitle title='Message'>
                <Grid container>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box p={2}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                label='x or h'
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
                                label='s'
                                onChange={setS}
                                value={s}
                                type='number'
                                helperText='Signature sent with the message'
                            />
                        </Box>
                    </Grid>
                </Grid>
            </PaperTitle>

            <PaperTitle title='Equation'>
                <Box p={2} align='center'>
                    This equation should return message if the signature is
                    correct. <br />
                    If it doesn't then message has been altered.
                </Box>
                <Box pt={2} align='center'>
                    Testing if:
                </Box>
                <Box pb={2} align='center'>
                    <DisplayFormula
                        number={'s'}
                        power={'e'}
                        modulo={'n'}
                        variant={'body1'}
                    />{' '}
                    ={' '}
                    <DisplayFormula
                        number={s}
                        power={e}
                        modulo={n}
                        variant={'body1'}
                    />{' '}
                    = h ?
                </Box>
            </PaperTitle>

            <PaperTitle title='Calculation' p={2}>
                <Grid container justify='center'>
                    <Grid item xs={12} sm={8} md={6}>
                        <FastPowerTable stepsObj={solutionPow} />
                    </Grid>
                </Grid>
            </PaperTitle>

            <PaperTitle title='Solution' p={2}>
                <Box p={2} align='center'>
                    Comparision: {solutionPow.result} (Result) = {x} (Message h)
                </Box>
                <Box p={2} pb={3} align='center'>
                    {x === solutionPow.result
                        ? 'Signature matches the message.'
                        : "Signature doesn't match the message."}
                </Box>
            </PaperTitle>
        </>
    );
}

export default RSAPodpisWeryfikacja;
