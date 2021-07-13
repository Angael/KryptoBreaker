import { Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { modInverse } from 'utils/numHelpers';

import useNumberInput from 'utils/useNumberInput';
import DisplayFormula from 'pages/diffie-hellman/DisplayFormula';
import KluczeDisplay from './KluczeDisplay';
import OdwrotnoscTable from 'pages/odwrotnosc/OdwrotnoscTable';
import PaperTitle from 'styled/PaperTitle';

function RSAKlucze() {
    const [p, setP] = useNumberInput(37);
    const [q, setQ] = useNumberInput(47);
    const [e, setE] = useNumberInput(1001);

    const n = p * q;
    const phi = (p - 1) * (q - 1);
    const d = modInverse(e, phi);

    return (
        <>
            <PaperTitle title='Inputs'>
                <Grid container>
                    <Grid item xs={12} sm={6} md={4}>
                        <Box p={2}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                label='p'
                                onChange={setP}
                                value={p}
                                type='number'
                                helperText='First random number'
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Box p={2}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                label='q'
                                onChange={setQ}
                                value={q}
                                type='number'
                                helperText='Second random number'
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Box p={2}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                label='e'
                                onChange={setE}
                                value={e}
                                type='number'
                                helperText='Random number from 1 to Φ'
                                error={e > phi || e <= 1 || e % 1 !== 0}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </PaperTitle>

            <PaperTitle title='Calculation'>
                <Box p={2}>
                    n = {p} * {q} = {n}
                </Box>
                <Box p={2}>
                    phi = Φ = ({p} - 1) * ({q}- 1)= {phi}
                </Box>
                <Box p={2}>
                    d ={' '}
                    <DisplayFormula
                        number={e}
                        power={-1}
                        modulo={phi}
                        variant={'body1'}
                    />{' '}
                    = {d}
                    <OdwrotnoscTable a={e} b={phi} />
                </Box>
            </PaperTitle>

            <KluczeDisplay e={e} n={n} d={d} showPaper />
        </>
    );
}

export default RSAKlucze;
