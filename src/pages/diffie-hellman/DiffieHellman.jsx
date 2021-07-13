import { useMemo } from 'react';
import { Typography, Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DisplayFormula from './DisplayFormula';
import useNumberInput from 'utils/useNumberInput';
import getFastPowerMod from 'utils/fast-power-table/getFastPowerMod';
import FastPowerTable from 'utils/fast-power-table/FastPowerTable';
import { isPrime } from 'utils/numHelpers';
import PaperTitle from 'styled/PaperTitle';

function DiffieHellman() {
    const [p, setP] = useNumberInput(1019);
    const [g, setG] = useNumberInput(2);
    const [a, setA] = useNumberInput(638);
    const [b, setB] = useNumberInput(719);

    const pIsPrime = useMemo(() => isPrime(p), [p]);

    const solutionPowA = useMemo(() => getFastPowerMod(g, a, p), [p, g, a]);
    const solutionPowB = useMemo(() => getFastPowerMod(g, b, p), [p, g, b]);

    const solutionPowAMaster = useMemo(
        () => getFastPowerMod(solutionPowA.result, b, p),
        [p, solutionPowA.result, b]
    );
    const solutionPowBMaster = useMemo(
        () => getFastPowerMod(solutionPowB.result, a, p),
        [p, solutionPowB.result, a]
    );

    const aErr = a >= p - 1 || a <= 1 ? `Allowed values <2 ; ${p - 2}> ` : '';
    const bErr = b >= p - 1 || b <= 1 ? `Allowed values <2 ; ${p - 2}> ` : '';

    return (
        <>
            <PaperTitle title='Explanation' p={2}>
                <Typography variant='body1' gutterBottom>
                    Diffie–Hellman key exchange allows for secure exchange of
                    keys over a public channel. Both parties can calculate the
                    same master private key without exchanging it once.
                </Typography>
                <Typography variant='body1' gutterBottom>
                    Person 1 generates random private key a
                </Typography>
                <Typography variant='body1' gutterBottom>
                    Person 2 generates random private key b
                </Typography>
                <Typography variant='body1' gutterBottom>
                    Then they calculate public keys they can give eachother in a
                    NOT secure way.
                </Typography>
                <Typography variant='body1' gutterBottom>
                    They exchange those public keys, and calculate the same
                    master private key
                </Typography>
            </PaperTitle>
            <PaperTitle title='Inputs'>
                <Grid container>
                    <Grid item xs={6} sm={3}>
                        <Box p={2}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                label='g'
                                onChange={setG}
                                value={g}
                                type='number'
                                helperText='Public generator'
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Box p={2}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                label='p'
                                onChange={setP}
                                value={p}
                                type='number'
                                helperText={
                                    pIsPrime
                                        ? 'Public modulo'
                                        : 'p has to be prime'
                                }
                                error={!pIsPrime}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Box p={2}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                label='a'
                                onChange={setA}
                                value={a}
                                type='number'
                                helperText={aErr || 'Person 1 private key'}
                                error={aErr}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Box p={2}>
                            <TextField
                                fullWidth
                                variant='outlined'
                                label='b'
                                onChange={setB}
                                value={b}
                                type='number'
                                helperText={bErr || 'Person 2 private key'}
                                error={bErr}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </PaperTitle>

            <PaperTitle title='Calculate public keys'>
                <Grid container>
                    <Grid item xs={6}>
                        <Box p={2}>
                            <Typography variant='h5'>
                                Person 1 calculates:
                            </Typography>
                            <DisplayFormula number={g} modulo={p} power={a} />
                            <FastPowerTable stepsObj={solutionPowA} />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box p={2}>
                            <Typography variant='h5'>
                                Person 2 calculates:
                            </Typography>
                            <DisplayFormula number={g} modulo={p} power={b} />
                            <FastPowerTable stepsObj={solutionPowB} />
                        </Box>
                    </Grid>
                </Grid>
            </PaperTitle>
            <PaperTitle title='Calculate private master key'>
                <Grid container>
                    <Grid item xs={6}>
                        <Box p={2}>
                            <Typography variant='h5'>
                                Person 1 calculates:
                            </Typography>
                            <DisplayFormula
                                number={solutionPowB.result}
                                modulo={p}
                                power={a}
                            />
                            <FastPowerTable stepsObj={solutionPowBMaster} />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box p={2}>
                            <Typography variant='h5'>
                                Person 2 calculates:
                            </Typography>
                            <DisplayFormula
                                number={solutionPowA.result}
                                modulo={p}
                                power={b}
                            />{' '}
                            <FastPowerTable stepsObj={solutionPowAMaster} />
                        </Box>
                    </Grid>
                </Grid>
            </PaperTitle>
            <Grid container>
                <Grid item xs={6}>
                    <Box p={2}></Box>
                </Grid>
                <Grid item xs={6}>
                    <Box p={2}></Box>
                </Grid>
            </Grid>
        </>
    );
}

export default DiffieHellman;
