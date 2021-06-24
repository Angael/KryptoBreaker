import { useMemo } from 'react';
import { Typography, Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { isPrime } from 'utils/numHelpers';

import useNumberInput from 'diffie-hellman/useNumberInput';
import getFastPowerMod from 'diffie-hellman/getFastPowerMod';
import DisplayFormula from 'diffie-hellman/DisplayFormula';
import FastPowerTable from 'diffie-hellman/FastPowerTable';
import KluczeDisplay from './KluczeDisplay';

function ElGamalSzyfrowanie() {
	const [p, setP] = useNumberInput(1619);
	const [alpha, setAlpha] = useNumberInput(2);
	const [t, setT] = useNumberInput(937);

	const solutionPowA = useMemo(() => getFastPowerMod(p, alpha, t), [p, alpha, t]);

	return (
		<>
			<Box my={4}>
				<Paper elevation={3}>
					<Grid container>
						<Grid item xs={12}>
							<Box p={2} pb={2} textAlign='center'>
								<Typography variant='h3'>Kryptosystem El Gamala</Typography>
							</Box>
							<Box p={2}>opis</Box>
							<Grid item xs={12}>
								<KluczeDisplay p={p} g={alpha} beta={solutionPowA.result} t={t} />
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
								<TextField label='p' onChange={setP} value={p} type='number' />
							</Box>
						</Grid>
						<Grid item xs={3}>
							<Box p={2}>
								<TextField
									label='β'
									disabled
									value={solutionPowA.result}
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
					</Grid>
				</Paper>
			</Box>
		</>
	);
}

export default ElGamalSzyfrowanie;
