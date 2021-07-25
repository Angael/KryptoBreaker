import { Typography, Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import useNumberInput from 'utils/useNumberInput';
import OdwrotnoscTable from './OdwrotnoscTable';
import PaperTitle from 'styled/PaperTitle';
import { modInverse } from 'utils/numHelpers';
import DisplayFormula from 'pages/diffie-hellman/DisplayFormula';

function Odwrotnosc() {
    const [a, setA] = useNumberInput(215);
    const [n, setN] = useNumberInput(25);

    const solution = modInverse(a, n);

    return (
        <>
            <PaperTitle title={'Inputs'}>
                <Grid container>
                    <Grid item xs={6} sm={4}>
                        <Box p={2}>
                            <TextField
                                variant={'outlined'}
                                fullWidth
                                label='Liczba'
                                type='number'
                                onChange={setA}
                                value={a}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Box p={2}>
                            <TextField
                                variant={'outlined'}
                                fullWidth
                                label='modulo'
                                placeholder={26}
                                type='number'
                                onChange={setN}
                                value={n}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </PaperTitle>

            <PaperTitle title={'Solution'}>
                <Box p={2}>
                    <Typography variant={'h5'}>
                        <DisplayFormula
                            number={a}
                            modulo={n}
                            power={-1}
                            variant={'h5'}
                        />{' '}
                        = {solution}
                    </Typography>
                </Box>
            </PaperTitle>

            <PaperTitle title={'Calculation'} p={2}>
                <OdwrotnoscTable a={a} b={n} />
            </PaperTitle>
        </>
    );
}

export default Odwrotnosc;
