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

function RSADeszyfrowanie() {
    //Zaszyfrowana wiadomosc x, szyfrogram y
    const [y, setY] = useNumberInput(1327);

    const rsaInputs = useRsaKeysInputs();
    const { e, d, n } = rsaInputs;

    // y^d mod n
    const solutionPow = useMemo(() => getFastPowerMod(y, d, n), [n, y, d]);

    return (
        <>
            <RsaKeyInputs {...rsaInputs} />

            <PaperTitle title='Encrypted message' p={2}>
                <Grid container>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            fullWidth
                            variant='outlined'
                            label='y'
                            onChange={setY}
                            value={y}
                            type='number'
                            helperText='Message to be decrypted'
                        />
                    </Grid>
                </Grid>
            </PaperTitle>

            <PaperTitle title='Equation'>
                <Box p={2} align='center'>
                    x ={' '}
                    <DisplayFormula
                        number={'y'}
                        power={'d'}
                        modulo={'n'}
                        variant={'body1'}
                    />{' '}
                    ={' '}
                    <DisplayFormula
                        number={y}
                        power={d}
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
                <BigText>Message x = {solutionPow.result}</BigText>
            </PaperTitle>
        </>
    );
}

export default RSADeszyfrowanie;
