import { Typography, Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { mod } from 'utils/numHelpers';

import useNumberInput from 'utils/useNumberInput';
import DisplayFormula from 'pages/diffie-hellman/DisplayFormula';
import PaperTitle from 'styled/PaperTitle';

function Mod() {
    const [num, setNum] = useNumberInput(2);
    const [modulo, setModulo] = useNumberInput(1019);

    const result = mod(num, modulo);

    return (
        <>
            <PaperTitle title={'Inputs'}>
                <Grid container>
                    <Grid item xs={6} sm={4}>
                        <Box p={2}>
                            {' '}
                            <TextField
                                fullWidth
                                variant={'outlined'}
                                label='Number'
                                onChange={setNum}
                                value={num}
                                type='number'
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={4}>
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
                            number={num}
                            power={''}
                            modulo={modulo}
                            variant={'h5'}
                        />{' '}
                        = {result}
                    </Typography>
                </Box>
            </PaperTitle>
        </>
    );
}

export default Mod;
