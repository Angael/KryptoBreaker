import { useMemo } from 'react';
import { Box, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import useNumberInput from 'utils/useNumberInput';
import getFastPowerMod from 'utils/fast-power-table/getFastPowerMod';
import DisplayFormula from 'pages/diffie-hellman/DisplayFormula';
import FastPowerTable from 'utils/fast-power-table/FastPowerTable';
import PaperTitle from 'styled/PaperTitle';

function PotegaMod() {
    const [g, setG] = useNumberInput(2);
    const [pow, setPow] = useNumberInput(638);
    const [modulo, setModulo] = useNumberInput(1019);

    const solutionPowA = useMemo(
        () => getFastPowerMod(g, pow, modulo),
        [modulo, g, pow]
    );

    return (
        <>
            <PaperTitle title={'Inputs'}>
                <Grid container>
                    <Grid item xs={6} sm={4}>
                        <Box p={2}>
                            <TextField
                                fullWidth
                                variant={'outlined'}
                                label='Number'
                                onChange={setG}
                                value={g}
                                type='number'
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={4} sm={4}>
                        <Box p={2}>
                            <TextField
                                fullWidth
                                variant={'outlined'}
                                label='Power'
                                onChange={setPow}
                                value={pow}
                                type='number'
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={4} sm={4}>
                        <Box p={2}>
                            <TextField
                                fullWidth
                                variant={'outlined'}
                                label='Modulo'
                                onChange={setModulo}
                                value={modulo}
                                type='number'
                            />
                        </Box>
                    </Grid>
                </Grid>
            </PaperTitle>

            <PaperTitle title={'Solution'}>
                <Box textAlign={'center'} p={2}>
                    <Typography variant={'h5'}>
                        <DisplayFormula
                            number={g}
                            power={pow}
                            modulo={modulo}
                            variant={'h5'}
                        />{' '}
                        = {solutionPowA.result}
                    </Typography>
                </Box>
            </PaperTitle>

            <PaperTitle title={'Calculation'}>
                <Grid container justify='center'>
                    <Grid item xs={12} sm={8} md={6}>
                        <Box p={2} pb={2} textAlign='center'>
                            <DisplayFormula
                                number={g}
                                power={pow}
                                modulo={modulo}
                                variant={'h5'}
                            />{' '}
                            <FastPowerTable stepsObj={solutionPowA} />
                        </Box>
                    </Grid>
                </Grid>
            </PaperTitle>
        </>
    );
}

export default PotegaMod;
