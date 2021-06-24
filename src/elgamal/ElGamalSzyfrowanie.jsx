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
	const [p, setP] = useNumberInput(2);
	const [alpha, setAlpha] = useNumberInput(1619);
	const [beta, setBeta] = useNumberInput(937);
	const [t, setT] = useNumberInput(937);

	const solutionPowA = useMemo(() => getFastPowerMod(p, g, t), [p, g, t]);

	return (
		<>
			<Box my={4}>
				<Paper elevation={3}>
					<Grid container>
						<Grid item xs={12}>
							<Box p={2} pb={2} textAlign='center'>
								<Typography variant='h3'>Kryptosystem El Gamala</Typography>
							</Box>
							<Box p={2}>
								Alicja chce wygenerować klucze asymetryczne ElGamala. W tym celu przyjęła wartość{' '}
								<b>p={p}</b> oraz generator <b>g={g}</b>.<br />
								Wyznacz klucze asymetryczne Alicji dla jej wartości prywatnej <b>t={t}</b>.
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
								<TextField
									label='β'
									onChange={setBeta}
									value={beta}
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
					<Box p={2} pb={2} textAlign='center'>
						<DisplayFormula p={p} g={g} power={t} variant={'h4'} />
					</Box>
					<Grid container justify='center'>
						<Grid item xs={6}>
							<FastPowerTable stepsObj={solutionPowA} pow={p} />
						</Grid>
					</Grid>

					<Grid item xs={12}>
						<KluczeDisplay p={p} g={g} beta={solutionPowA.result} t={t} />
					</Grid>
				</Paper>
			</Box>
		</>
	);
}

export default ElGamalSzyfrowanie;
