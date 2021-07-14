import { useMemo } from 'react';
import { Typography, Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import useNumberInput from 'utils/useNumberInput';
import getFastPowerMod from 'utils/fast-power-table/getFastPowerMod';
import DisplayFormula from 'pages/diffie-hellman/DisplayFormula';
import FastPowerTable from 'utils/fast-power-table/FastPowerTable';
import KluczeDisplay from './KluczeDisplay';
import PaperTitle from 'styled/PaperTitle';
import RsaKeyInputs, { useRsaKeysInputs } from 'pages/rsa/RSAKeyInputs';
import BigText from 'utils/BigText';

function RSASzyfrowanie() {
    //Wiadomość x
    const [message, setMessage] = useNumberInput(20);

    const rsaInputs = useRsaKeysInputs();
    const { e, d, n } = rsaInputs;

    // x^n mod e
    const solutionPow = useMemo(
        () => getFastPowerMod(message, e, n),
        [n, message, e]
    );

    return (
        <>
            <RsaKeyInputs {...rsaInputs} />
            <PaperTitle title='Message' p={2}>
                <Grid container>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            label='x'
                            onChange={setMessage}
                            value={message}
                            type='number'
                            helperText='Message to be encrypted'
                        />
                    </Grid>
                </Grid>
            </PaperTitle>

            <PaperTitle title='Equation'>
                <Box p={2} align='center'>
                    y = c =
                    <DisplayFormula
                        number={'x'}
                        power={'e'}
                        modulo={'n'}
                        variant={'body1'}
                    />{' '}
                    ={' '}
                    <DisplayFormula
                        number={message}
                        power={e}
                        modulo={n}
                        variant={'body1'}
                    />
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
                <BigText>Cryptogram y = {solutionPow.result}</BigText>
            </PaperTitle>
        </>
    );
}

export default RSASzyfrowanie;
